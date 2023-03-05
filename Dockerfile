FROM node:lts

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y git
WORKDIR /app
RUN yarn global add vite