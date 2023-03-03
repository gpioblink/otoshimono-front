FROM node:lts

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y git
RUN npm install -g npm
WORKDIR /app