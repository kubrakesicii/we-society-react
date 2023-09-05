FROM node:18-alpine
WORKDIR /reactapp-node
COPY ./package.json /reactapp-node

RUN npm install
COPY . .

EXPOSE 3001
CMD ["npm","start"]