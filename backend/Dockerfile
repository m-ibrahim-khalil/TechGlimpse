# base Node.js LTS image
FROM node:lts-alpine

# set the working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# copy remaining files
COPY . .

# expose port on the host
EXPOSE 3001

CMD [ "npm", "start" ]