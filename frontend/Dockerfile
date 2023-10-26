# BASE
FROM node:18-alpine AS base

WORKDIR /app

COPY . .
EXPOSE 3000

# DEVELOPMENT
FROM base AS dev

RUN npm install
CMD ["npm", "run", "dev"]
