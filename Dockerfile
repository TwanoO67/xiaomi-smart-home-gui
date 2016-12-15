FROM node:latest

# Create app directory
RUN mkdir -p /mihome
WORKDIR /mihome

# Install app dependencies
COPY package.json /mihome
RUN npm install

# Bundle app source
COPY . /mihome

RUN ls -al

#Création de la base
RUN mkdir -p /mihome/db
RUN touch /mihome/db/database.db

RUN cd gui
RUN npm install
RUN npm run prod

RUN cd ..

CMD [ "node", "./logger/logger.js" ]
CMD [ "node", "./gui/server.js" ]
CMD [ "./api/rest/bin/www" ]

EXPOSE 1337 3000
VOLUME ["/mihome/db"]
