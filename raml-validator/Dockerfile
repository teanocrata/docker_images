# Base docker image
FROM node:7-alpine

RUN mkdir /home/node/raml-validator
ADD . /home/node/raml-validator
WORKDIR /home/node/raml-validator

RUN npm install -g

WORKDIR /

CMD [ "node" ]
