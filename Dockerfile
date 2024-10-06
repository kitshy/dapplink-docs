FROM node:18
WORKDIR /app
COPY . /app
RUN npm install && npm run docs:build
EXPOSE 3000
CMD ["npm", "run", "docs:dev"]
