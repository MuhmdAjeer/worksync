FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD npx mikro-orm migration:create --config=./mikro-orm.config.ts && npx mikro-orm migration:up --config=./mikro-orm.config.ts && npm run start:dev
# CMD ["npm", "start"]
