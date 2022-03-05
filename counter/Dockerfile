FROM node:16.14

WORKDIR /count

COPY package*.json ./
RUN npm install
COPY . ./

CMD ["node", "index.js"]
