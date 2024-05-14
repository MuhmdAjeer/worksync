FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Create migrations, run migrations, start the application in dev mode, and then seed the database
CMD npx mikro-orm migration:create --config=./mikro-orm.config.ts && \
    npx mikro-orm migration:up --config=./mikro-orm.config.ts && \
    npm run start:dev && \
    npm run seed