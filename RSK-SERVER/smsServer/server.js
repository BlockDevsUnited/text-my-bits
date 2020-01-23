
let ethers = require('ethers')
let contractAddress = "0x582eec13b61839e6143aa25b3c230bfac9298fbe"
let contractABI = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_to",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_from",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_phoneNo",
				"type": "uint256"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "phoneNoBalances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "to",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "from",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
]
let contract
let contract2
let contractInstance
let abc
let wallet

initialize()

async function initialize(){
	// abc ="aare"
  // contract2 = web3.eth.contract(contractABI);
	// console.log(contract2)
  // contractInstance = contract2.at(contractAddress);
	// console.log(contractInstance)
let privateKey = '0x17ac27604be1689aeede64c164ed93c8cae17a10ca5b36fec764c5270ba27866';
let provider = new ethers.providers.JsonRpcProvider("https://public-node.testnet.rsk.co");

wallet = new ethers.Wallet(privateKey, provider);
console.log(wallet)
console.log(provider)
console.log(wallet.address)

  contract = new ethers.Contract(contractAddress,contractABI,wallet)
	console.log("contract initialized")
  console.log(contract)
}



// contract.on("Transfer", (from, to, value, event) => {
//     // Called when anyone changes the value
//     console.log("Transfer Detected")
//     console.log(from);
//
//     console.log(to);
//
//     console.log(value);
//
//     console.log(event.blockNumber);
// });

let topic = ethers.utils.id("Transfer(uint,uint,uint)");

let filter = {
    address: contractAddress,
    topics: [ topic ]
}

contract.on(filter, (result) => {
    console.log(result);
    // {
    //    blockNumber: 3606106,
    //    blockHash: "0x878aa7059c93239437f66baeec82332dcb2f9288bcdf6eb1ff3ba6998cdf8f69",
    //    transactionIndex: 6,
    //    removed: false,
    //    address: "0x6fC21092DA55B392b045eD78F4732bff3C580e2c",
    //    data: "0x00000000000000000000000006b5955a67d827cdf91823e3bb8f069e6c89c1d6" +
    //            "000000000000000000000000000000000000000000000000016345785d8a0000",
    //    topics: [
    //      "0x179ef3319e6587f6efd3157b34c8b357141528074bcb03f9903589876168fa14",
    //      "0x90a4d0958790016bde1de8375806da3be227ff48e611aefea36303fb86bca5ad"
    //    ],
    //    transactionHash: "0x0d6f43accb067ca8e391666f37f8e8ad75f88ebd8036c9166fd2d0b93b214d2e",
    //    logIndex: 6
    // }
});
