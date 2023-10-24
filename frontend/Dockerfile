# BASE
FROM node:18-alpine AS base

WORKDIR /app

COPY . .
EXPOSE 3000


# DEVELOPMENT
FROM base AS dev

RUN npm i

CMD ["npm", "run", "dev"]


# PRODUCTION
FROM base AS prod

# ENV NODE_ENV production

RUN npm i
RUN npm run build

RUN rm -rf src/pages
RUN rm -rf public
RUN rm -rf next.config.js

CMD ["npm", "start"]

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=prod /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
