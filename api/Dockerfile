FROM node:12-alpine

WORKDIR /app

COPY package.json package-lock*.json ./
RUN npm install

COPY . .
ENV PATH /app/node_modules/.bin:$PATH
ENTRYPOINT ["npm", "start"]
