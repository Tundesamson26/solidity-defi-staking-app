/* eslint-disable no-undef */
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts) {
  try {
    //Deploy Meal Teather contract
    await deployer.deploy(Tether);
    const tether = await Tether.deployed();

    //Deploy RWD contract
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    //Deploy DecentralBank contract
    await deployer.deploy(DecentralBank, tether.address, rwd.address);
    const decentralBank = await DecentralBank.deployed();

    // transfer all RWD to the Decentral bank
    await rwd.transfer(decentralBank.address, "1000000000000000000000000");

    // transfer all tether to the Decentral bank
    // await tether.transfer(decentralBank.address, "1000000000000000000000000");

    // transfer 100 Meal Tether to investor
    await tether.transfer(accounts[1], "1000000000000000000");
  } catch (error) {
    console.error("Detailed error:", error);
    // Log the specific account balances for debugging
    const tether = await Tether.deployed();
    const balance = await tether.balanceOf(accounts[0]);
    console.log("Current deployer balance:", balance.toString());
    throw error;
  }
};