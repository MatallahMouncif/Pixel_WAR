FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3003
CMD [ "node", "index.js" ]