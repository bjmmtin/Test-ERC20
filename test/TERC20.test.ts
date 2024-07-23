const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("ERC20Token", function () {
  let token;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    token = await upgrades.deployProxy(ERC20Token, [], { initializer: 'initialize' });
    await token.deployed();
  });

  it("Should assign 1 million tokens to the owner and 9 million to the contract", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.utils.parseUnits("1000000", 6));

    const contractBalance = await token.balanceOf(token.address);
    expect(contractBalance).to.equal(ethers.utils.parseUnits("9000000", 6));
  });

  it("Should burn tokens when called by the owner", async function () {
    await token.burn(ethers.utils.parseUnits("100", 6));
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.utils.parseUnits("999900", 6));
  });

  it("Should fail to burn tokens when called by non-owner", async function () {
    await expect(token.connect(addr1).burn(ethers.utils.parseUnits("100", 6))).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
