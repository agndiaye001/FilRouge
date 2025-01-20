# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install @react-navigation/native

COPY . .

RUN npm run build
 
#---------------------------------------------
# Development Stage
FROM nginx:stable-alpine AS development

EXPOSE 3000

COPY --from=build /app /usr/share/nginx/html

CMD ["npm", "start"]









