## Installation

```bash
npm install
```

## Install nestjs cli

```
sudo npm i -g @nestjs/cli
```

## Create project with nestjs

```
nest new nestjs-prisma --strict
```

## Docker compose

```
docker-compose up -d
```

## Init Prisma

```
npx prisma init
```

## Migrate Prisma

```
npx prisma migrate dev --name init --skip-generate
```

## Create Prisma module

```
nest g module modules/user
```

```
npx nest generate module modules/socket
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov

# test spec
npm run spec --spec=character/character.controller
```

## Prisma studio

```
npx prisma studio
```
