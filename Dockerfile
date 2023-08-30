FROM node:18-alpine
WORKDIR /reactapp
COPY ./package.json /reactapp

RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm","start"]