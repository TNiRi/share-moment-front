# Этап сборки
FROM node:24 AS build-stage

ARG VUE_APP_MAPLIBRE_APIKEY
ENV VUE_APP_MAPLIBRE_APIKEY=$VUE_APP_MAPLIBRE_APIKEY

ARG VUE_APP_MODE
ENV VUE_APP_MODE=$VUE_APP_MODE

ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=$VUE_APP_API_URL

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Этап продакшена
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]