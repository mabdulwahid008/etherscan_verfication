const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

async function main() {
  const verifyContract = await ethers.getContractFactory("Verify");
  const deployedVerifyContract = await verifyContract.deploy();
  await deployedVerifyContract.deployed();

  console.log("Verify Contract Address:", deployedVerifyContract.address);
  console.log("Sleeping.....");

  await sleep(40000);
  await hre.run("verify:verify", {
    address: deployedVerifyContract.address,
    constructorArguments: [],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// const { ethers, hardhatEthers, providers } = require("hardhat");
// const { providers } = require("ethers");
// require("@nomiclabs/hardhat-ethers");
// require('dotenv').config()

// async function main() {
//   const verifyContract = await ethers.getContractFactory("Verify");

//   const deployVerifyContract = await verifyContract.deploy();

//   console.log("Verfiy Contract Address is:", deployVerifyContract.address);

//   console.log("Sleeping for 40 seconds...");
//   await sleep(40000);

//   const provider = new providers.JsonRpcProvider(process.env.URL, "mumbai");
//   // const provider = new JsonRpcProvider(process.env.URL, "mumbai");
//   const signer = provider.getSigner(process.env.PRIVATE_KEY);
//   const contract = new ethers.Contract(deployVerifyContract.address, verifyContract.abi, signer);

//   const verifyTransaction = await contract.functions.verify();

//   console.log("Transaction Hash:", verifyTransaction.hash);

//   console.log("Waiting for the transaction to be mined...");
//   await verifyTransaction.wait();

//   console.log("Transaction confirmed. Verifying contract on PolygonScan...");

//   await hardhatEthers.getVerifier("polygonMumbai").verify(deployVerifyContract.address);

//   console.log("Verification complete.");
// }

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
