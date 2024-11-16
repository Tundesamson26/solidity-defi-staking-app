/* eslint-disable no-undef */
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", ([owner, customer]) => {
  let tether, rwd, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    try {
      // load contracts
      console.log("Deploying Tether...");
      tether = await Tether.new();
      console.log("Tether deployed at:", tether.address);

      console.log("Deploying RWD...");
      rwd = await RWD.new();
      console.log("RWD deployed at:", rwd.address);

      console.log("Deploying DecentralBank...");
      decentralBank = await DecentralBank.new(rwd.address, tether.address);
      console.log("DecentralBank deployed at:", decentralBank.address);

      // transfer all tokens to decentralBank
      await rwd.transfer(decentralBank.address, tokens("1000000"));

      // tranfer 100 meal token to customers
      await tether.transfer(customer, tokens("100"), { from: owner });
    } catch (error) {
      console.error("Detailed error:", error);
      throw error;
    }
  });

  describe("Meal Teather Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Meal Tether Token");
    });
  });

  describe("RWD Token Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });
});