FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN  export NODE_OPTIONS=--openssl-legacy-provider && npm run build --omit=dev
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html