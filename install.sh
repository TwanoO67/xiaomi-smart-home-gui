#!/bin/bash
echo "Installation des dependances ";

cd api/rest
npm install

cd ../../logger
npm install

cd ../gui
npm install

cd ..
if [ ! -f db/database.db ]
then
  touch db/database.db
fi

echo "Installation terminée, lancez le scripts avec start.sh"
