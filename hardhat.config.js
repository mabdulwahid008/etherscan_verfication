// require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-toolbox")
require('dotenv').config()

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: process.env.URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_KEY
    }
  }
};