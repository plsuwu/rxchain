# RxChain 

> IFB452 (Blockchain Technology) A3

This project was set up to be served at [rx.rat.moe](https://rx.rat.moe) for the presentation - feel free to poke around here, but please note that there is a high possibility of availability issues, so please check the footnote[^1] if you cannot connect.

## Solidity Contract Setup

> [!IMPORTANT]  
>  You will most likely have to delete `remappings.txt` in order for Remix to correctly resolve OpenZeppelin `npm` packages - you will probably also have other issues (e.g. `CREATE2` determinism functionality) if you attempt to deploy with Remix, however.

This project was built using [Foundry](https://www.getfoundry.sh/) to make the development process a little easier; I run NixOS so getting Remix downloaded locally is tricky, and browser-based Remix is not viable on account of the use of Hyperledger Besu: 

<img width="756" height="258" alt="image" src="https://github.com/user-attachments/assets/ff9e4a9d-9db3-4831-94d8-92a73d267e9e" />

As such, included instructions are pertinent to Foundry ([install docs](https://www.getfoundry.sh/introduction/installation)).

### 1. Starting the Besu Network

In order to properly deploy these contracts, you will likely need to run the Besu network locally, and connect Remix to this. This repo has a Docker Compose configuration available, and should simply be a matter of installing `docker` and `docker-compose` ([Docker Compose install docs](https://docs.docker.com/compose/install/)) and running the config.

Assuming Docker is installed, running the network should be a matter of simply cloning this repository, `cd`ing into it, and running `docker compose -f ./besu-qbft/besu-compose.yml up -d`:

```bash
git clone https://github.com/plsuwu/rxchain
cd rxchain
docker compose -f ./besu-qbft/besu-compose.yml up -d
```


### 2. Installing dependencies

In the repository root, install dependencies with `soldeer`:

```bash
forge soldeer install
```

Check that `remappings.txt` has not updated itself; it should look like the following:

```
@openzeppelin/contracts/=dependencies/@openzeppelin-contracts-5.6.1/
forge-std/=dependencies/forge-std-1.16.0/src/
```

### 3. Contract Deployment

Foundry's deployment scripts are Solidity contracts. In this project, they live in the  `/script` directory. Deploying is simply a matter of compiling the contracts and deploying them to the Besu network:

```bash
forge build
forge script script/Deploy.s.sol:Deploy  \
  --rpc-url http://localhost:8545        \
  --broadcast
```

## Client side

The client side is housed in `/client`. It is built on `SvelteKit` and *primarily* utilizes `viem` for smart contract/network interactivity (there is some `wagmi` usage as well).

First, copy `.env.example` into a new `.env` - this only holds the path to the SQLite database, but without it the server won't start.

Building this should be as simple as moving into the `/client` directory and (assuming `npm` and `node` are installed locally) installing dependencies with `npm install --omit=dev`, building with `npm run build`, and running the server with `node build/index`:

```bash
cd client &&          \
  npm i --omit=dev && \
  npm run build    && \
  node build/index
```

Finally, note that being able to properly connect on `http://localhost:3000` requires the Besu network to be running with contracts fully deployed. 

 [^1]: **On availability**: Hyperledger Besu tends to consume a lot of memory (in the context of a webservice, that is), and the VPS it is running on only has 1GB available to work with; realistically this means there is a good chance it will die. I will do my best to keep it alive, but please keep in mind that if you do go to connect and it won't load then it is very likely that Besu has triggered the out-of-memory killer and destroyed itself.
