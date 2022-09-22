const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  mocha: {},
  compilers: {
    solc: {
      version: '0.8.16'
    }
  },
  networks: {
    inf_Uniswap_goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('/Users/kevin/github/key.env', 'utf-8'), "https://goerli.infura.io/v3/f0267a8d7d5642caa8735db53507eefd")
    }
  }
};
