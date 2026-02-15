import { InterfaceAbi } from 'ethers'

// Deterministic addresses based on Anvil's default deployment order (Account 0 deploys)
export const CONTRACT_ADDRESSES = {
  AOXC_TOKEN: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Mock AOXC
  GOVERNANCE: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', // Governor
  TREASURY: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', // Timelock/Treasury
  MARKET: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9' // NFT Market
}

export const GENERIC_ABI = {
  ERC20: [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address owner) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'event Transfer(address indexed from, address indexed to, uint256 value)'
  ],
  GOVERNOR: [
    'function castVote(uint256 proposalId, uint8 support) returns (uint256)',
    'function state(uint256 proposalId) view returns (uint8)',
    'function proposals(uint256 proposalId) view returns (uint256 id, address proposer, uint256 eta, uint256 startBlock, uint256 endBlock, uint256 forVotes, uint256 againstVotes, bool canceled, bool executed)'
  ],
  MARKET: [
    'function buyItem(uint256 itemId) external payable',
    'function listLoop(uint256 categoryId) view returns (uint256[])',
    'event ItemBought(address indexed buyer, uint256 itemId, uint256 price)'
  ]
}
