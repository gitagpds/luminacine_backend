FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080 // INI JUGA KUUBAHHH
CMD ["node", "index.js"]
