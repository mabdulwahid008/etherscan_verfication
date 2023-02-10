
const { ethers } = require("hardhat");

async function main() {
  const verifyContract = await ethers.getContractFactory("Verify")

  const deployeVerfiyContract = await verifyContract.deploy();

  await deployeVerfiyContract.deployed()

  console.log( "Verfiy Contract Address is " + deployeVerfiyContract.address);

  console.log("Sleeping ....");

  await sleep(40000)

  await hre.run("verify-verify", {
    address: deployeVerfiyContract.address,
    constructorArguments: []
  })

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
