import { UserProfile } from '../types';

// Simulation of a Web3 Service interacting with the contracts in /src/core and /src/governance
// In a real app, this would use ethers.js or viem + wagmi

const MOCK_DELAY = 800;

export interface TokenMetrics {
  totalSupply: string;
  holders: number;
  transfers: number;
  marketCap: string;
  price: number;
}

export const connectWallet = async (): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        address: '0x71C...9A23',
        balance: '1,450.50 AOXC',
        reputation: 850, // High Liyakat
        rank: 'Commander',
        role: 'Fleet Admiral',
        badges: [
            {
                id: 'nft-1',
                tier: 'ADMIRAL',
                shipId: 'andromeda',
                issuedDate: '2024-05-12',
                tokenId: '1'
            },
            {
                id: 'nft-2',
                tier: 'GOLD',
                shipId: 'aquila',
                issuedDate: '2024-06-01',
                tokenId: '42'
            }
        ]
      });
    }, MOCK_DELAY);
  });
};

export const getNetworkStatus = async () => {
  return {
    name: 'OKX X Layer',
    id: 196,
    block: 1245092,
    latency: '34ms'
  };
};

export const submitVote = async (proposalId: number, support: boolean): Promise<boolean> => {
  console.log(`Voting on ${proposalId}: ${support ? 'For' : 'Against'}`);
  return new Promise((resolve) => setTimeout(() => resolve(true), MOCK_DELAY));
};

export const executeSwap = async (fromToken: string, toToken: string, amount: string): Promise<string> => {
  console.log(`Swapping ${amount} ${fromToken} to ${toToken} via AQUILA_EXCHANGE`);
  return new Promise((resolve) => setTimeout(() => resolve("0xHash...Transaction"), 1500));
};

// Mocks the data fetching from OKLink for AOXC Token
export const getAOXCTokenMetrics = async (): Promise<TokenMetrics> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalSupply: "1,000,000,000",
        holders: 1245,
        transfers: 15892,
        marketCap: "$420,000,000",
        price: 0.42
      });
    }, 600);
  });
};