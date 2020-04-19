<p align="center">
  <img src="https://i.imgur.com/kF3KMEO.jpg" width="1000" title="Text My Bits">
</p>


## Setup

1. run npm install in the Express-Server folder
2. install twilio-cli globally: npm i -g twilio-cli
3. Sign into twilio cli using twilio login
4. run twilio phone-numbers:update "+14387956502" --sms-url="http://localhost:3000/sms"
5. npm run start in Express-Server

For Antoine Portal

1. change server.template.js to server.js
2. get private key and put it where it says "private key"
3. npm install in the Antoine/Portal folder
4. node server.js in the Antoine/Portal folder

for Frontend that uses RSK

1. run npm install in the rns-manager-react folder
2. make sure Antoine/Portal/server.js is running
3. npm start in rns-manager-react
