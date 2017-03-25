var five = require("johnny-five"),
  board, lcd;
var PubNub = require('pubnub')

pubnub = new PubNub({
  publishKey : 'pub-c-0107042d-cac3-4854-9323-b2fd0badf295',
  subscribeKey : 'sub-c-cfaa271a-119f-11e7-b568-0619f8945a4f'
})

function sendMessage(message) {
  var publishConfig = {
      channel : "temp",
      message : message
  }
  pubnub.publish(publishConfig, function(status, response) {
      console.log(status, response);
  })
}

var Port = require('serialport').SerialPort;
var port = new Port('/dev/cu.usbmodemFD121')

port.on('open', () => {
  port.on('data', (data) => {
    console.log(data[0]);
    console.log(data[1]);
    sendMessage({temp: data[0], hum: data[1]});
  })
});
