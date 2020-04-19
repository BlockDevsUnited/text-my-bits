var server = "http://localhost:3001"//"https://gentle-peak-60588.herokuapp.com"
var response
async function getAdmin() {
  //var params = "?" + "from=" + from.toString() + "&to=" + to.toString()
   var xhttp = await createCORSRequest('GET', server + "/getAdmin");
   await sendRequest(xhttp)
   console.log(response)
}

async function register(phoneNoHash,address) {
  var params = "?" + "phoneNoHash=" + phoneNoHash.toString() + "&address=" + address.toString()
  var xhttp = await createCORSRequest('GET', server + "/register" + params);
  let admin = await sendRequest(xhttp)
  console.log(response)
}

async function transfer(from,to,amount) {
  var params = "?" + "from=" + from.toString() + "&to=" + to.toString() + "&amount=" + amount.toString()
  var xhttp = await createCORSRequest('GET', server + "/transfer" + params);
  let admin = await sendRequest(xhttp)
  console.log(response)
}

async function getBalance(phoneNoHash) {
  var params = "?" + "phoneNoHash=" + phoneNoHash.toString()
  var xhttp = await createCORSRequest('GET', server + "/getBalance" + params);
  await sendRequest(xhttp)
  console.log(response)
}

async function fetchConverters(){

  var xhttp = await createCORSRequest('GET', server + "/converters");
  await sendRequest(xhttp,"converters",750)
  if(converters!=null){
  console.log("got converters")
}

  return new Promise(function(resolve) {
		setTimeout(resolve, 0);
		});
}

async function fetchCoords(){

  var xhttp = await createCORSRequest('GET', server + "/coords");
  await sendRequest(xhttp,"coords",200)
  if(converters!=null){
  console.log("got coords")
}
  return new Promise(function(resolve) {
		setTimeout(resolve, 0);
		});
}

async function fetchHashes(){

  var xhttp = await createCORSRequest('GET', server + "/hashes");
  await sendRequest(xhttp,"hashes",200)
  if(converters!=null){
  console.log("got hashes")
}  return new Promise(function(resolve) {
    setTimeout(resolve, 0);
    });
}

async function sendRequest(xhttp,requestType,data){
  if (!xhttp) {
    throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
   var responseText = xhttp.responseText;
   console.log(responseText)
   response = responseText
  };

  xhttp.onerror = function() {
    console.log('There was an error!');
    return "error"
  };
    xhttp.send();
    return new Promise(function(resolve){})
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(xhr);
    }, 200);
  });
}
