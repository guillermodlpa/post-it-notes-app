#!/bin/bash
# From: http://stackoverflow.com/questions/25942475/ubuntu-vagrant-puphpet-how-to-auto-start-node-js-app-on-boot

# pm2 module allows you to run a node.js app as a service
# Then have to cd into the app dir, and from there, start the app with sudo pm2

# Supposedly from this point forward, the node.js app will run/restart automatically (including when app crashes or when Ubuntu restarts),
# so you don't have to run this command more than once (hence the /exec-once folder instead of exec-always,
# which would run each time "vagrant up" is called, including a future boot after the initial setup).

# pm2 also has features allowing you to watch for changes in a folder so that your node.js app will be restart automatically
# if you're developing. See pm2 documentation for those details or type pm2 in ssh.

echo "" >> /var/www/logs/vagrant.log
echo "$(date) - server_start.sh" >> /var/www/logs/vagrant.log

#package installed in exec_once
#cd /var/www && pm2 start processes.json