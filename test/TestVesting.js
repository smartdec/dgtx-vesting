var Token = artifacts.require("DGTX");
var Vesting = artifacts.require("Vesting");

const increaseTime = (time) => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [time], // Time increase param.
      id: new Date().getTime(),
    }, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

contract("Vesting", function (accounts) {
    it("Checking if important functions are unavailable for no owner", async function () {
        let token = await Token.new({from: accounts[0]});
        let vesting = await Vesting.new(token.address, {from: accounts[0]});

        var success = false;
        try {
            await vesting.withdraw({from: accounts[1]});
            success = true
        } catch (e) {}

        try {
            await vesting.transferOwnership(accounts[0], {from: accounts[1]});
            success = true;
        } catch (e) {}

        if (success) throw new Error("Some of sensetive functions are available for no owner.");
    });
    it ("Check ownership transfer", async function () {
        let token = await Token.new({from: accounts[0]});
        let vesting = await Vesting.new(token.address, {from: accounts[0]});

        await vesting.transferOwnership(accounts[1], {from:accounts[0]});
        assert.equal(await vesting.owner(), accounts[1], "The ownership transferred incorrectly");
    });
    it("Checking wrong fallback call", async function () {
        var totalTokens = 10 ** 26;
        let token = await Token.new({from: accounts[0]});
        let vesting = await Vesting.new(token.address, {from: accounts[0]});

        var success = false;
        try {
            await token.transfer(vesting.address, 10, {from: accounts[0]});
            success = true;
        } catch (e) {}

        if (success) throw new Error("Can transfer not 100m tokens.");

        try {
            await vesting.tokenFallback(accounts[0], totalTokens, "", {from: accounts[0]});
            success = true;
        } catch (e) {}

        if (success) throw new Error("Can call not from token.");

        await token.transfer(vesting.address, totalTokens, {from: accounts[0]});

        try {
            await token.transfer(vesting.address, totalTokens, {from: accounts[0]});
            success = true;
        } catch (e) {}

        if (success) throw new Error("Can call fallback twice.");
    });
    it("Checking normal work process", async function () {
        var totalTokens = 10 ** 26;
        let token = await Token.new({from: accounts[0]});
        let vesting = await Vesting.new(token.address, {from: accounts[0]});

        await token.transfer(vesting.address, totalTokens, {from: accounts[0]});

        var success = false;
        try {
            await vesting.withdraw(1, {from: accounts[0]});
            success = true;
        } catch (e) {

        }

        if (success) throw new Error("Can withdraw money before start.")

        await increaseTime(5.5 * 31 * 86400);

        try {
            await vesting.withdraw(totalTokens / 4, {from: accounts[0]});
        } catch (e) {
            throw new Error("Can't withdraw first 25%.");
        }

        success = false;
        try {
            await vesting.withdraw(100, {from: accounts[0]});
            success = true;
        } catch (e) {

        }
        if (success) throw new Error("After start time can withdraw more than 25%");

        for (var i = 0; i < 12; i++) {
            await increaseTime(3 * 31 * 86400);
            try {
                await vesting.withdraw(totalTokens * 625 / 10000, {from: accounts[0]});
            } catch (e) {
                throw new Error("Can't withdraw next 6.25%.");
            }

            success = false;
            try {
                await vesting.withdraw(100, {from: accounts[0]});
                success = true;
            } catch (e) {

            }
            if (success) throw new Error("After next quarter can withdraw more than 6.25%");
        }

    });
    it("Checking withdraw all", async function () { // Here testrpc time is shifted, all tokens are available
        var totalTokens = 10 ** 26;
        let token = await Token.new({from: accounts[0]});
        let vesting = await Vesting.new(token.address, {from: accounts[0]});
        await token.transfer(vesting.address, totalTokens, {from: accounts[0]});

        await vesting.withdrawAll({from: accounts[0]});
        assert.isAtLeast(await token.balanceOf(accounts[0]), totalTokens, "Tokens wasn't withdrawn to account.")

        success = false;
        await increaseTime(6 * 31 * 86400);
        try {
            await vesting.withdraw(1, {from: accounts[0]});
            success = true;
        } catch (e) {
        }
        if (success) throw new Error("After the last withdraw can withdraw");
    });
})