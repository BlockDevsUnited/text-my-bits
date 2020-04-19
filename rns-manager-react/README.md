<img src="/logo.png" alt="logo" height="200" />

# `rns-manager-react`

[![CircleCI](https://circleci.com/gh/rnsdomains/rns-manager-react.svg?style=svg)](https://circleci.com/gh/circrnsdomains/rns-manager-react)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/rnsdomains/rns-manager-react.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/rnsdomains/rns-manager-react/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/rnsdomains/rns-manager-react.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/rnsdomains/rns-manager-react/context:javascript)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rnsdomains_rns-manager-react&metric=alert_status)](https://sonarcloud.io/dashboard?id=rnsdomains_rns-manager-react)

Live at https://manager.rns.rifos.org

## Requisites

- [Node v12](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/)

## Setup

Install dependencies:
```
yarn
```

## Run locally

1. Run a local blockhain:
    - Preferred: [RSK node](https://developers.rsk.co/quick-start/step1-install-rsk-local-node/)
    - Other options: Ganache or Truffle develop
2. Deploy [RNS Suite](https://github.com/rsksmart/rns-suite) on your local blockchain.
3. Set the contract addresses in `/src/app/config/contracts.local.json`. The contract names are the same as the JSON variable name except for the following:
    - `rif` variable is the `ERC677` contract
    - `registrar` variable is the `TokenRegistrar` contract

> If you are not using `localhost:8545` as your network, change the .env variable in `.env.local`

```
yarn start
```

> Connect your browser wallet to local environment using 'Custom RPC' option

## Run on public networks

For RSK Mainnet 

```
yarn start:mainnet
```

For RSK Testnet

```
yarn start:testnet
```

## Run tests

Run the linter and unit tests:

```
yarn test
```

Run a test watcher:

```
yarn test:watch
```

Update snapshots and run watcher:
```
yarn test:watch -u
```

## Develop

- `master` points to last productive build
- `develop` points to last approved pull request
- Other branches are feature branches, based on develop

## Build

```
yarn build
```

For RSK Mainnet:

```
yarn build:mainnet
```

For RSK Testnet:

```
yarn build:testnet
```

## Running production builds

Mainnet:
```
docker build -t rns-manager-mainnet . -f mainnet.Dockerfile
docker run -d --name rns-manager-mainnet -p 5000:5000 rns-manager-mainnet
```

Testnet:
```
docker build -t rns-manager-testnet . -f testnet.Dockerfile
docker run -d --name rns-manager-testnet -p 5001:5001 rns-manager-testnet
```
