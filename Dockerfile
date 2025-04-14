FROM node:18

RUN rm -rf /usr/local/lib/node_modules/npm/node_modules/cross-spawn

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npm start & npm test"]
