
FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8989

RUN npm start

RUN npm install -g pm2

CMD ["pm2-runtime", "dist/index.js"]
