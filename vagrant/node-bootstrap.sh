#!/usr/bin/env bash

# Get root up in here
sudo su

# Just a simple way of checking if we need to install everything
if [ ! -d "/var/www2" ]
then
    # Add MongoDB to apt
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
    apt-get update
    apt-get install -y mongodb-org

    # Update and begin installing some utility tools
    apt-get -y update
    apt-get install -y python-software-properties
    apt-get install -y vim git subversion curl
    apt-get install -y memcached build-essential

    # Add nodejs repo
    add-apt-repository -y ppa:chris-lea/node.js
    apt-get -y update

    # Install nodejs
    apt-get install -y nodejs

    apt-get install curl
    curl -sL https://deb.nodesource.com/setup | sudo bash -
    sudo apt-get install -y nodejs
    npm update
    npm -g install sails

    # Symlink our host www to the guest /var/www folder
    ln -s /vagrant/www /var/www2

    # Run it
    cd /var/www/default
    sails lift

    # Victory!
    echo "You're all done! Your default node server should now be listening on http://10.0.33.34/. For code, see: node-mongo-vagrant/www/default/server.js."
else
  # Run it
    cd /var/www/default
    sails lift
fi
