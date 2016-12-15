var dash_button = require('/usr/local/lib/node_modules/node-dash-button');
var request = require('/usr/local/lib/node_modules/request');
var poo_button = 'ac:63:be:08:43:0e' // The MAC address for the button goes here
var webhook = 'https://hooks.zapier.com/hooks/catch/1721423/thfntw/';

var dash = dash_button([poo_button], null, null, 'all');

dash.on("detected", function (dash_id){
  if (dash_id === poo_button){
    console.log("Parp!");
    requestData = {
      "when": new Date().toISOString()
    };
    request({
      url: webhook,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestData)
    });
  }
});
