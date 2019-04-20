FROM node:10-alpine

ENV NODE_ENV=development \
    PORT=3000

WORKDIR /app

ADD *.json ./

RUN npm install

# WORKDIR /app/src

RUN ls
RUN env

EXPOSE 3000

CMD ["npm", "run", "dev"]