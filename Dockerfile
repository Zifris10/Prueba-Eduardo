FROM node:18-alpine
RUN mkdir -p /api
WORKDIR /api
COPY ./ ./
RUN npm install
EXPOSE 3000
RUN npm run build
RUN npm run migrate
RUN npm run seeders
CMD [ "npm", "run", "serve" ]