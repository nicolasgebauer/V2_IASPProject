# BASE
FROM node:18-alpine AS base

WORKDIR /app

COPY . .
EXPOSE 3000

# DEVELOPMENT
FROM base AS dev

RUN npm install
CMD ["npm", "run", "dev"]

# PRODUCTION
FROM base AS prod

RUN npm install
RUN npm run build

CMD ["npm", "start"]

# NGINX (para desarrollo)
FROM nginx:latest AS nginx-dev

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=dev /app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]