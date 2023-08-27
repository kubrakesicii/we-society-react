FROM node:18-alpine
WORKDIR /reactappnode
COPY ./package.json /reactappnode

RUN npm install
COPY . .

EXPOSE 3001
CMD ["npm","start"]