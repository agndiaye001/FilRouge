# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

 
#---------------------------------------------
# Development Stage
FROM nginx:stable-alpine AS development

EXPOSE 3000

COPY /app /usr/share/nginx/html

CMD ["npm", "start"]


RUN npm run build







