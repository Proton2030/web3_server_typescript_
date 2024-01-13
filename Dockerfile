FROM node


WORKDIR ./src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8989

CMD ["npx", "ts-node-dev","src/index.ts"]
