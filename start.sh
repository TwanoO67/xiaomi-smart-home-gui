#!/bin/bash

#Lancement de l'API
#node api/index.js &
node api/koa.js &

#Lancement du logger
node api/logger.js
