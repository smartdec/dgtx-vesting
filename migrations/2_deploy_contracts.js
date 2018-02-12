var Vesting = artifacts.require("./Vesting.sol")

module.exports = function(deployer, network, accounts) {
  // address of DGTX token
  deployer.deploy(Vesting, 0x1c83501478f1320977047008496dacbd60bb15ef);
};
