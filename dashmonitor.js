var dash_button = require('node-dash-button')
var request = require('request')
var fs = require('fs')

// post data as JSON to a webhook URL
function post(url) {
  request({
    url: url,
    method: "GET"
  })
}

// Load configuration
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
var buttons = config["buttons"]

// Monitor the buttons!
var dash = dash_button(Object.keys(buttons), null, null, 'all')
console.log(new Date().toISOString() + " - started")
dash.on("detected", function (mac) {
  when = new Date().toISOString()
  console.log(when + " - button pushed: " + mac);
  if (buttons[mac]) {
    post(buttons[mac])
  }
})
