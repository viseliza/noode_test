FROM node:18.16-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run prisma:postgres

CMD npm start
