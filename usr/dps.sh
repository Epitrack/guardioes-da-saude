#!/bin/bash
# Script to install all dependencies

sudo apt-get install python-setuptools -y
sudo easy_install pip
sudo pip install pymongo boto==2.41 python-gcm jinja2 geocoder
