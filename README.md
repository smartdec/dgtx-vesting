# Digitex Vesting contract

Vesting contract allows to lock in [DGTX tokens](https://etherscan.io/address/0x1c83501478f1320977047008496dacbd60bb15ef) and withdraw them in portions according to the predefined scheme.
The planned amount to lock-in is 100,000,000 DGTX.

## Structure
1. Vesting contract is ownable.
2. Owner can send DGTX to the contract.
3. Contract locks-in received tokens, they are inaccessible.
4. Owner can withdraw tokens up to the amount defined by the vesting schedule (see below).
5. Owner can transfer ownership over the contract.

## Vesting schedule
On July 15 2018 25% of tokens locked in the contract become available.
Further, after every quarter of the year the contract unlocks 6.25% of the tokens it is holding.

## Build

```bash
npm install
npm run truffle compile
```

## Deploy
To deploy contracts to Ethereum network

Edit `truffle-config.js` for proper network, like:
```js
module.exports = {
  networks: {
    ropsten:  {
      network_id: 3,
      host: "192.168.88.242",
      port:  8546,
      gas:   4600000,
      gasPrice: 5000000000
    }
    ...
```

And run
```bash
npm run truffle migrate
```

## Test (Unix only)
To run test run
```bash
npm run test
```

## Coverage (Unix only)
To run test coverage run

```bash
npm run coverage
```


## Addtional notes
Folder `test/DGTX` is DGTX token source code from [repo](https://github.com/DigitexFutures/DigitexTokens).
