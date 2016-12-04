FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

RUN ls -al

#Création de la base
RUN mkdir -p /data
RUN touch /data/database.db
RUN node ./mihome/createDb.js

CMD [ "node", "./mihome/logger.js" ]
