## GraphQL file import

Nest.js GraphQL app that allows users to import a CSV file
into a database and then access the data via GQL queries.

### Installation

```
npm install
```

### Setup
Start the database:

```
docker compose up -d db
```

For tests:

```
docker compose up -d db-test
```

Prepare an appropriate `.env` file. For local development or tests you can just copy the `.env.example` file and rename it to `.env`.

### Build
Build the app:

```
npm run build
```

### Running
Development

```
npm run start:dev
```

Production

```
npm run start:prod
```

### Testing
After the test database is set up, run:

```
npm run test:e2e
```
