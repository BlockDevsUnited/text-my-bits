let ethers = require('ethers');
const http = require('http')
const port = 3001

let contractABI = require('./contract.json')
let contractAddress = "0x86e2073284B72256Fa674FfFa19B2449485F7192"

let provider = ethers.getDefaultProvider('ropsten');
let privateKey = ""
wallet = new ethers.Wallet(privateKey, provider);
contract = new ethers.Contract(contractAddress,contractABI,wallet)

async function getAdmin(){
  let admin = await contract.admin()
  return(admin)
}

async function deposit(amount){
  await contract.deposit({value:amount})
}

async function withdraw(amount){
  await contract.withdraw(amount)
}

async function register(phoneNoHash,address) {
  await contract.register(phoneNoHash,address)
}

async function transfer(from,to,amount) {
  console.log(from,to,amount)
  await contract.transferBalance(from,to,amount)
}

async function getBalance(phoneNoHash) {
  return(await contract.getBalance(phoneNoHash))
}

const requestHandler = async(request, response) => {
  console.log(request.url)

	const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'X-Requested-With'
  };

  if (request.method === 'OPTIONS') {
    response.writeHead(204, headers);
    response.end();
    return;
  }

  if (['GET', 'POST'].indexOf(request.method) > -1) {
    response.writeHead(200, headers);

		let requestSplit = request.url.split("?")
		if(requestSplit[0]=="/getAdmin"){

			let responseString = await getAdmin()
      console.log(responseString)


			// let params = requestSplit[1].split("&")
			// 	for (let i = 0;i<params.length;i++){
			// 		let keyValue = params[i].split("=")
			// 		let key = keyValue[0]
			// 		let value = keyValue[1]
			// 		responseString += key + ": " + value + "\n"
			// 	}
				response.end(responseString)
				return;

    }else if(requestSplit[0]=="/register"){
      let phoneNoHash = requestSplit[1].split("&")[0].split("=")[1]
      let address = requestSplit[1].split("&")[1].split("=")[1]
      await register(phoneNoHash,address)
      console.log(phoneNoHash,address)
      response.end("Successfully registered")
      return;

    }else if(requestSplit[0]=="/transfer"){
      let from = requestSplit[1].split("&")[0].split("=")[1]
      let to = requestSplit[1].split("&")[1].split("=")[1]
      let amount = requestSplit[1].split("&")[2].split("=")[1]
      amount = ethers.utils.parseUnits(amount,1)
      await transfer(from,to,amount)
      console.log(from,to,amount)
      response.end("successfully transferred")
      return;

    }else if(requestSplit[0]=="/getBalance"){
      let phoneNoHash = requestSplit[1].split("&")[0].split("=")[1]
      let balance = await getBalance(phoneNoHash)

      console.log(balance)
      responseString = ethers.utils.formatUnits(balance,18)
      console.log(responseString)
      response.end(responseString)
      return;
    }

    else {

		response.writeHead(200, headers);
		response.end("method is not allowed for the request.")

		return;
		}
}
}

const server = http.createServer(requestHandler)

server.listen(process.env.PORT || port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
