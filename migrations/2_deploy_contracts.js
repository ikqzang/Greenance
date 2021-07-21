var contract = artifacts.require("./Greenance.sol");

module.exports = function(deployer) {
  deployer.deploy(contract);
};