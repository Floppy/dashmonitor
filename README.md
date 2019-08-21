# dashmonitor

A simple utility daemon for monitoring dash buttons on a local network and calling webhooks associated with them. Press button, call URL. Easy. This was written originally to create a [poo button](https://floppy.org.uk/blog/2016/11/20/the-poo-button/), which then got written up in [Wired](http://www.wired.co.uk/article/amazon-dash-hack-poo-button-internet-of-things).

## Installation

Get the code from GitHub and install dependencies. You'll need a recent version of `nodejs` installed. You'll also need to install `libpcap` on your system.

```
brew install libpcap # For OSX, your system may vary
git clone https://github.com/Floppy/dashmonitor.git
cd dashmonitor
npm install
```

### Raspberry Pi
```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs libpcap-dev
git clone https://github.com/Floppy/dashmonitor.git
cd dashmonitor/
npm install
```

## Find your buttons

```
sudo node_modules/node-dash-button/bin/findbutton
```

Press the button, and the MAC address will appear in the list.

## Configuration

```
cp config.json.example config.json
nano config.json
```

Create a line for each dash button, with the MAC address from the previous step
and the webhook URL you want to call. You can use [requestb.in](https://requestb.in) if you're just testing, otherwise hooking up to a [Zapier](https://zapier.com) webhook is a good approach to then configure other services.

## Running

```
npm start
```

### OSX System Daemon

You can run this anywhere, but if you're using OSX, there is a plist file for running it as a system daemon. First, edit dashmonitor.plist and set the paths in the `ProgramArguments` and `WorkingDirectory` keys correctly for your system. Then:

```
cp dashmonitor.plist /Library/LaunchDaemons
sudo launchctl load /Library/LaunchDaemons/dashmonitor.plist
```

If you have problems with the system daemon, I highly recommend debugging it with [LaunchControl](http://www.soma-zone.com/LaunchControl/).

### systemd script

There is a _systemd_ startup script for Raspbian or other Debian-ish systems:

    sudo cp boot-scripts/systemd/dashbuton.service /etc/systemd/system/
    sudo systemctl enable dashbutton.service
    sudo start dashbutton.service

_dashmonitor_ should now kick-off at boot-time
