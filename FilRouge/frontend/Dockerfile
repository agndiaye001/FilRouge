# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install
npm install @react-navigation/native

COPY . .

RUN npm run build
 
#---------------------------------------------
# Development Stage
FROM nginx:stable-alpine AS development

EXPOSE 3000

COPY --from=build /app /usr/share/nginx/html

CMD ["npm", "start"]


#---------------------------------------------
# Production Stage
FROM nginx:stable-alpine AS production

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]






