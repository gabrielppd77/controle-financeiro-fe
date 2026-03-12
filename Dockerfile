# Step 1 - Build application
FROM node:24.13.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL

RUN npm run build

# Step 2 - Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# replace config default of nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]