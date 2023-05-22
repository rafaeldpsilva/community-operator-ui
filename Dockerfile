FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build --prod
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html