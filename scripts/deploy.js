const { ethers, hardhatEthers } = require("hardhat");
const { providers } = require("ethers");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config()

async function main() {
  const verifyContract = await ethers.getContractFactory("Verify");

  const deployVerifyContract = await verifyContract.deploy();

  console.log("Verfiy Contract Address is:", deployVerifyContract.address);

  console.log("Sleeping for 40 seconds...");
  await sleep(40000);

  const provider = new providers.JsonRpcProvider(process.env.URL, "goerli");
  const signer = provider.getSigner(process.env.PUBLIC_ADDRESS);
  const contract = new ethers.Contract(deployVerifyContract.address, verifyContract.abi, signer);
  // it stops here and throws error but the contract gets verfied
  const verifyTransaction = await contract.functions.verify();

  console.log("Transaction Hash:", verifyTransaction.hash);

  console.log("Waiting for the transaction to be mined...");
  await verifyTransaction.wait();

  console.log("Transaction confirmed. Verifying contract on PolygonScan...");

  await hardhatEthers.getVerifier("polygonMumbai").verify(deployVerifyContract.address);

  console.log("Verification complete.");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
