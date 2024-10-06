FROM node:18
WORKDIR /app
COPY . /app
RUN npm install pnpm -g && pnpm install && pnpm run docs:build
EXPOSE 3000
CMD ["pnpm", "run", "docs:dev"]
