# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

# Copy the application code
COPY . .

# Production Stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy only necessary files from the build stage (including the build output)
COPY --from=build /app ./

# Install any production dependencies
RUN npm install --only=production

# Build the app (this can be an npm run build or your own custom command)
RUN npm run build
RUN ls build

#---------------------------------------------
# Development Stage
FROM nginx:stable-alpine AS development

EXPOSE 3000

COPY --from=build /app /usr/share/nginx/html

CMD ["npm", "start"]

#---------------------------------------------
# Production Stage (Nginx)
FROM nginx:stable-alpine AS production-nginx

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
