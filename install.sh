#!/bin/bash
echo "Installation des dependances ";

npm install

#Dependance de dev pour la GUI
#cd ../gui
#npm install

cd ..
if [ ! -f ./db/database.db ]
then
  mkdir -p ./db
  touch ./db/database.db
fi

echo "Installation terminée, lancez le scripts avec start.sh"
