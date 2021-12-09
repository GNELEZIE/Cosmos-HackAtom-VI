const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("TokenFactory", function () {
  it("Should return the contract adress on contract deploy", async function () {
    const TokenFactory = await ethers.getContractFactory("TokenFactory");
    const tokenFactory = await TokenFactory.deploy();
    const _tokenf_adress = await tokenFactory.deployed();
    console.log(_tokenf_adress.address);
    console.log(tokenFactory.address);
    expect(await tokenFactory.address).to.equal(_tokenf_adress.address);
    

    const _name  = "TOURE SOULEYMANE";
    const _symbol  = "SLM";
    const _decimals  = 18;
    const _totalSupply  = 1000000000000;
    const _beneficiary  = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
    const deployNewToken = await tokenFactory.deployNewToken(_name, _symbol,  _decimals,  _totalSupply,  _beneficiary);
    // wait until the transaction is mined
    await deployNewToken.wait();
    
    expect(await deployNewToken.tokens[0]).to.equal(deployNewToken.address);
  });


});
