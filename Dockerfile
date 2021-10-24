FROM node:14-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
RUN npm install nodemon -g

COPY ./src .

EXPOSE 4000
CMD nodemon -L --watch app.js