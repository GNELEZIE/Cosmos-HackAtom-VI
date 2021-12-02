require("@nomiclabs/hardhat-waffle");
let conf = require('dotenv').config().parsed;
require("@nomiclabs/hardhat-ethers");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "evmostestnet",
  networks: {
     hardhat: {},
     evmostestnet: {
      url: "https://ethereum.rpc.evmos.dev",
      accounts: ["434B96870C2D1F912FDD4344DAE22CDF4CDFAA41887D91258C9882B015FAB44C"]
    },
  },
};

