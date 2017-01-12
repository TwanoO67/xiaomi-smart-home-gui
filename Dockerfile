FROM node:latest

# Create app directory
RUN mkdir -p /mihome
WORKDIR /mihome
COPY . /mihome

RUN ./bin/install.sh

CMD [ "./bin/start.sh" ]
