import dotenv from "dotenv";

import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "solidity-docgen";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const MAINNET_KEY = process.env.MAINNET_KEY || "sample-mainnet-key";
const SEPOLIA_KEY = process.env.SEPOLIA_KEY || "sample-sepolia-key";
const MUMBAI_KEY = process.env.MUMBAI_KEY || "sample-mumbai-key";
const MNEMONIC = process.env.MNEMONIC || "sample-mnemonic";
const COIN_MARKET_CAP_KEY =
  process.env.COIN_MARKET_CAP_KEY || "sample-coin-market-cap-key";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "etherscan-api-key";
const POLYGONSCAN_API_KEY =
  process.env.POLYGONSCAN_API_KEY || "polygonscan-api-key";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 20000,
          },
        },
      },
    ],
  },
  gasReporter: {
    coinmarketcap: COIN_MARKET_CAP_KEY,
    currency: "USD",
    gasPrice: 15,
  },
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: false,
    pages: "files",
  },
  contractSizer: {
    runOnCompile: false,
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    ganache: {
      url: `http://127.0.0.1:8545`,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_KEY}`,
      accounts: [`${PRIVATE_KEY}`]
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_KEY}`,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${MAINNET_KEY}`,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${MAINNET_KEY}`,
      accounts: {
        mnemonic: MNEMONIC,
      },
      gasPrice: 100000000000,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      sepoolia: SEPOLIA_KEY,
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
  mocha: {
    timeout: 100000,
  },
};
