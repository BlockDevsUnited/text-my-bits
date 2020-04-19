var express = require('express');
var router = express.Router();
const accountSid = 'ACeab53269a170044c8100b504c0589dcd';

var crypto = require('crypto');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
let TXData= new Map();
let contractABI = require('./contract.json')

let ethers = require('ethers')
require('dotenv').config()

const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

function get_timestamp() {

  var now = new Date();

  return 'utc|' + now.getUTCFullYear() +
      '/' + (now.getUTCMonth() + 1) +
      '/' + now.getUTCDate() +
      '|' + now.getHours() +
      ':' + now.getMinutes() +
      ':' + now.getSeconds() +
      ':' + now.getMilliseconds();

}
let contractAddress = "0x314c563161b5139ba704e757385260cc5a7bd0f0"

initialize()

async function initialize(){

  let string=process.env.SECRET+"15199020000".toString()
  let talhash=ethers.utils.hashMessage(string)
  console.log(talhash + " talhash123")	// abc ="aare"
  // contract2 = web3.eth.contract(contractABI);
	// console.log(contract2)
  // contractInstance = contract2.at(contractAddress);
	// console.log(contractInstance)
let privateKey = process.env.PRIVATEKEY;
let provider = new ethers.providers.JsonRpcProvider("https://public-node.rsk.co");
wallet = new ethers.Wallet(privateKey, provider);

  contract = new ethers.Contract(contractAddress,contractABI,wallet)
	console.log("contract initialized")
  console.log(contract)
}
async function transfer(from,to,amount) {

   console.log(await contract.transfer(from,to,amount));
   return;

}

async function balanceOf(address) {
	return await contract.balanceOf(address)
}

async function getAddress(phoneNo) {
	return await contract.getAddress(phoneNo)
}
function get_randomTokenHex(len) {
  return crypto.randomBytes(Math.ceil(len / 2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, len).toUpperCase(); // return required number of characters
}
function create_phone_number_alias(_phonenumber){
  console.log(_phonenumber + "this is the damn phone number")
  let string=process.env.SECRET+_phonenumber.toString()
  console.log(string)
  let hash=ethers.utils.hashMessage(string)
  console.log(hash)
 // return parseInt(hash.slice(2,17))
 return hash;
}
/* GET home page. */
router.get('/', function(req, res, next) {
  /**client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12054481897',
     to: '+13022998401'
   })

  .then(message => console.log(message.sid));
  **/
  res.render('index', { title: 'Express' });
});

router.post('/sms', async(req, res) => {
  const twiml = new MessagingResponse();
   //console.log(req.body)
   let from=req.body.From.slice(1)
   console.log(from + "fromfromfrom")
   from=create_phone_number_alias(from)
   console.log("starting")
   let message=req.body.Body
   let length=message.length

   if(message.slice(0,7)==="Receive"){
      let OTP=message.slice(-4)
      let otp=OTP;
      otp=await contract.getHash(otp)
      console.log(OTP)
      let h=await contract.getHash(OTP)
      let T=await contract.Transactions(h)
      console.log(T.value + "      value")
       let Value=T.value.toString()
       let sender=T.sender


      console.log(sender)
      console.log(Value)

      console.log(await contract.transfer(sender,from,T.value))

      client.messages.create({
        body: 'your transaction id'+otp+' for '+Value+'you created been redeemed. The transaction will go through shortly',
        from: '+14387956502',
        to: sender
      }).then(message => console.log(message.sid));

      twiml.message('your transaction id'+otp+'for '+Value+'has been redeemed. The transaction will go through shortly')
      res.writeHead(200, {'Content-Type': 'text/xml'});
      console.log('sending')
      res.end(twiml.toString());

   }else if(message.slice(0,7)==="Balance" ){
      console.log(typeof(from));
      console.log("jfoajfoiej")
      console.log(await contract.getAddress(from))
      let address=await contract.getAddress(from);
      console.log(address+"address");
      let amount= await contract.balanceOf(address)
      console.log(amount+"amount")
      let formattedAmount = ethers.utils.formatUnits(amount,18)
      let textResponse = "You have " + formattedAmount + " RBTC"
      twiml.message(textResponse);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      console.log('sending')
      res.end(twiml.toString());
   }else{
      let end=message.slice(-8);
      let start=message.slice(0,15);
      let value=message.slice(15,length-9);

      console.log(value + "       value ")
      console.log(start)
      console.log(end)
      console.log(start+end)
      console.log((start+end =="I want to send satoshis"))

      if(start+end == 'I want to send satoshis'){
        console.log('working2')
        let otp=get_randomTokenHex(4)
        let data={User:from,Value:value,timestamp:get_timestamp()}

        twiml.message(otp);
        otp=await contract.getHash(otp)
        console.log(otp)
        //TXData.set(otp,data)
        console.log(await contract.createOTPHash(otp,value,from))
      }
      res.writeHead(200, {'Content-Type': 'text/xml'});
      console.log('sending')
      res.end(twiml.toString());

  }



});

/**router.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
**/
async function updatedHandler(message,from){
  let length=message.length
  const twiml = new MessagingResponse();
  if(message.slice(0,7)==="Receive"){
     let OTP=message.slice(-4)
    /**  let otp=OTP;
     OTP=ethers.utils.keccak256('0x'+OTP)
     console.log(OTP)
     let txData=TXData.get(OTP)

     console.log(txData)
     let Value=txData.Value
     let sender=txData.User
     console.log(sender)
     console.log(Value)

     TXData.set(OTP,{User:sender,Value:0,timestamp:get_timestamp()})
    */
     console.log(await contract.ValidateOTP(OTP,from))
     //console.log(await contract.transfer(Number(sender),Number(from),Number(Value)))

     client.messages.create({
       body: 'your transaction id'+otp+'for '+Value+'you created been redeemed. The transaction will go through shortly',
       from: '+14387956502',
       to: sender
     }).then(message => console.log(message.sid));

     twiml.message('your transaction id'+otp+'for '+Value+'has been redeemed. The transaction will go through shortly')
     res.writeHead(200, {'Content-Type': 'text/xml'});
     console.log('sending')
     res.end(twiml.toString());

  }else if(message.slice(0,7)==="Balance" ){
     console.log(from);
     let address=await contract.getAddress(from);
     console.log(address+"address");
     let amount= await contract.balanceOf(address)
     console.log(amount+"amount")
     console.log(amount.toString())

     twiml.message(amount.toString());
     res.writeHead(200, {'Content-Type': 'text/xml'});
     console.log('sending')
     res.end(twiml.toString());
  }else{
     let end=message.slice(-8);
     let start=message.slice(0,15);
     let value=message.slice(15,length-9);
     console.log(value + " value")
     console.log(start)
     console.log(end)
     console.log(start+end)
     console.log((start+end =="I want to send satoshis"))

     if(start+end == 'I want to send satoshis'){
       console.log('working')
       let otp=get_randomTokenHex(4)
       //let data={User:from,Value:value,timestamp:get_timestamp()}
       twiml.message(otp);
       otp=ethers.utils.keccak256('0x'+otp)
       console.log(otp)
       //TXData.set(otp,data)
       await contract.createOTPHash(otp,value,from)
     }
     res.writeHead(200, {'Content-Type': 'text/xml'});
     console.log('sending')
     res.end(twiml.toString());

 }

}
router.post('/testsms', async(req, res) => {
  let sender=1
  let receiver=6438722457
  amount = "1000"
	amount = ethers.utils.parseUnits(amount,18)
  await transfer(sender,receiver,amount)

  //console.log(receipt)


  res.writeHead(200, {'Content-Type': 'text/xml'});
 // res.end(twiml.toString());
});

router.post('/tests', async(req, res) => {
  let sender=1
  let receiver=6438722457
  amount = "1000"
  amount = ethers.utils.parseUnits(amount,0)
  console.log(amount.toString())

  await transfer(sender,receiver,amount)

  res.writeHead(200, {'Content-Type': 'text/xml'});
 // res.end(twiml.toString());
});

router.post('/OTP', function(req, res, next) {
  /**client.messages
  .create({alue: BigNumber { _hex: '0x00' },alue: BigNumber { _hex: '0x00' },
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12054481897',
     to: '+13022998401'
   })

  .then(message => console.log(message.sid));
  **/
 console.log(req.body.OTP)
  res.send(TXData.get(req.body.OTP))
});


module.exports = router;


//twilio phone-numbers:update "+12054481897" --sms-url="http://localhost:3000/sms"
