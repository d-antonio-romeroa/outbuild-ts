# Outbuild Technical Test

## Project Setup

### Requirements

To run this project, you will need:

- Docker Desktop installed on your machine.
- Postman to test the REST API.
- A web browser to view the Swagger documentation at `http://localhost:{PORT}/docs`.

### Getting Started

1. Clone or download the repository.
2. Set the environment variables on `.env` file:

```

- DATABASE CONFIG
DB_USERNAME=string
DB_PASSWORD=string
DB_DATABASE=string
DB_HOST=string
DB_DIALECT=postgres

- API CONFIG
PORT=number

- FOR JWT AUTH
JWT_SECRET=string
JWT_EXPIRY=8h # 1h, 1s, 1m 

- FOR DATA ENCRYPTION
SECRET_KEY=string
IV=string

```

3. Optional - execute sequelize migrations and seeders:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

4. Start the project using Docker.

```bash
npm run docker:start
```

- Depending on the defined `NODE_ENV`, the project will start in dev, test, or production mode.
- Once started, the Swagger documentation is available at `http://localhost:{PORT}/api-docs`.

To stop docker containers execute:

```bash
npm run docker:stop
```

## Project Explanation

### Project packages
- Dotenv - to handle environment variables
- Express.js - as web server.
- jsonwebtoken - for jwt authentication and authorization.
- Nodemon - as package for development hot reload.
- Sequelize - ORM for database management.
- Swagger UI - to document api endpoints.
- Vitest - to handle testing
- Winston - for logging.
- Yup - to validate objects.

### Project structure

- `./src/`: Contains api code.
    - `./__tests__`: Contains unit test files and postman collection.
    - `./app`: App that contains api code.
        - `./http`: Contains controllers to handle requests validation and services.
            - `./controllers`: Contains controllers to handle requests validation and services.
            - `./middleware`: Contains middlewares for authentication, rate limit, etc.
            - `./requests`: Contains validator for api requests.
            - `./responses`: Contains validator for api responses.
        - `./models`: Contains sequelize-typescript models.
        - `./repositories`: Contains repositories that handle orm or database queries.
        - `./services`: Contains services that handler business logic.
    - `./config`: Contains configuration files for database connection, api server and swagger docs.
    - `./jobs`: App that contains jobs app code.
    - `./orm`: Contains configuration files for sequelize orm.
        - `./config`: Contains sequelize cli config file.
        - `./migrations`: Contains sequelize migration files.
        - `./models`: Contains sequelize model files.
        - `./seeders`: Contains sequelize seeder files.
    - `./routes`: Contains express routes and routers.

## To do

- Generate dtos.
- Add security for csrf, xss, cors, among other solutions.
- Move jobs queue processing to another server.
