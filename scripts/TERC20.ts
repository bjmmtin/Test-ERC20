
const { ethers, upgrades } = require("hardhat");

async function main() {
  const ERC20Token = await ethers.getContractFactory("ERC20Token");
  const token = await upgrades.deployProxy(ERC20Token, [], { initializer: 'initialize' });
  await token.deployed();
  console.log("ERC20Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });