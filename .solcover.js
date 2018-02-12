// Solidity-coverage 0.4.8 is not compatible with the latest solc versions, without forcing tests to use `.call()`
// on `view` or `pure` methods, which either requires an asymmetric refactorng or adding `.call()` into various places,

// so we will stick to 0.3.5 for now.
//
// TODO: once the upgrade to 0.4.8 will be possible, please replace the `copyNodeModules: true` setting with the
// `copyPackages: ['zeppelin-solidity']`.

module.exports = {
    testCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network coverage',
    compileCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle compile --network coverage',
    copyNodeModules: true,
    norpc: true,
    skipFiles: [
        'Migrations.sol', 'ERC223.sol', 'ERC223ReceivingContract.sol'
    ]
};
