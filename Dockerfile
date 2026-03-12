# Etapa 1 - Build da aplicação
FROM node:24.13.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL

RUN npm run build

# Etapa 2 - Servir com nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]