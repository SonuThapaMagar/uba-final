FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g ts-node

COPY . .

EXPOSE 8000

# Express server
CMD ["npm","run", "start"]