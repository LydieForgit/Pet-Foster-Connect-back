FROM node:25-alpine

WORKDIR /usr/src/

COPY ./package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "run","dev"]