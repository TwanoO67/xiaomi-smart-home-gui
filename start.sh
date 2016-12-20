#!/bin/bash

#Lancement de l'API
node api/rest/index.js &

#Lancement du logger
node logger/index.js &

node gui/index.js
