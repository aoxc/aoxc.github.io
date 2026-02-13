import { ethers } from "ethers";

/* ===============================
   CONFIG
================================ */
const RPC_URL = "https://rpc.xlayer.okx.com";

const AOXC_CONTRACTS = [
  "0xeb9580c3946bb47d73aae1d4f7a94148b554b2f4", // AOXC
  "0x97Bdd1fD1CAF756e00eFD42eBa9406821465B365", // Aquila
  "0x20c0DD8B6559912acfAC2ce061B8d5b19Db8CA84"  // Pegasus
];

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

export interface ChainData {
    block: {
        number: number;
        hash: string;
        time: string;
    } | null;
    tokens: {
        address: string;
        name: string;
        symbol: string;
        supply: string;
    }[];
    events: {
        contract: string;
        block: number;
        tx: string;
    }[];
    isSimulated?: boolean;
}

// --- MOCK DATA GENERATOR (Fallback) ---
const generateMockData = (): ChainData => {
    const blockNum = 1245000 + Math.floor(Math.random() * 10000);
    const mockTokens = [
        { address: AOXC_CONTRACTS[0], name: "AOXC Governance", symbol: "AOXC", supply: "1000000000.0" },
        { address: AOXC_CONTRACTS[1], name: "Aquila Liquidity", symbol: "AQL", supply: "500000000.0" },
        { address: AOXC_CONTRACTS[2], name: "Pegasus Sight", symbol: "PGS", supply: "250000.0" }
    ];

    const mockEvents = Array.from({ length: 5 }).map((_, i) => ({
        contract: AOXC_CONTRACTS[Math.floor(Math.random() * AOXC_CONTRACTS.length)],
        block: blockNum - Math.floor(Math.random() * 50),
        tx: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    })).sort((a, b) => b.block - a.block);

    return {
        block: {
            number: blockNum,
            hash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
            time: new Date().toLocaleTimeString()
        },
        tokens: mockTokens,
        events: mockEvents,
        isSimulated: true
    };
};

export const fetchChainIntel = async (): Promise<ChainData> => {
    try {
        // Attempt to create provider
        const provider = new ethers.JsonRpcProvider(RPC_URL);

        // Create a timeout promise to fail fast if RPC is unresponsive/blocked
        const timeout = new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error("RPC Timeout")), 4000)
        );

        const fetchData = async (): Promise<ChainData> => {
            /* ===== BLOCK INTEL ===== */
            const blockNumber = await provider.getBlockNumber();
            const latestBlock = await provider.getBlock(blockNumber);

            const blockData = {
                number: latestBlock?.number || 0,
                hash: latestBlock?.hash || "0x00",
                time: latestBlock?.timestamp ? new Date(latestBlock.timestamp * 1000).toLocaleTimeString() : "Unknown"
            };

            /* ===== TOKEN STATE ===== */
            const tokenData = [];

            for (const addr of AOXC_CONTRACTS) {
                try {
                    const c = new ethers.Contract(addr, ERC20_ABI, provider);
                    const [name, symbol, decimals, supply] = await Promise.all([
                        c.name().catch(() => "Unknown"),
                        c.symbol().catch(() => "UNK"),
                        c.decimals().catch(() => 18),
                        c.totalSupply().catch(() => BigInt(0))
                    ]);

                    tokenData.push({
                        address: addr,
                        name,
                        symbol,
                        supply: ethers.formatUnits(supply, decimals)
                    });
                } catch (err) {
                    tokenData.push({
                        address: addr,
                        name: "Unknown Contract",
                        symbol: "???",
                        supply: "0"
                    });
                }
            }

            /* ===== EVENT FEED ===== */
            const fromBlock = blockNumber - 50; 
            let logs: any[] = [];

            // Fetch sequentially to be gentle on the RPC
            for (const addr of AOXC_CONTRACTS) {
                try {
                   const l = await provider.getLogs({
                        address: addr,
                        fromBlock,
                        toBlock: blockNumber
                    });
                    logs.push(...l.map(x => ({
                        contract: addr,
                        block: x.blockNumber,
                        tx: x.transactionHash
                    })));
                } catch {
                    // Ignore individual log fetch errors
                }
            }

            const sortedEvents = logs
                .sort((a, b) => b.block - a.block)
                .slice(0, 10);

            return {
                block: blockData,
                tokens: tokenData,
                events: sortedEvents,
                isSimulated: false
            };
        };

        // Race between real fetch and timeout
        return await Promise.race([fetchData(), timeout]);

    } catch (e) {
        console.warn("Chain Intel: Network error or CORS issue detected. Switching to SIMULATION mode.", e);
        return generateMockData();
    }
};
