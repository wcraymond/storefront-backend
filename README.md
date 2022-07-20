# Storefront Backend

This project is a simple storefront backend application. It was built based on the requirements documented in the REQUIREMENTS.md file. This project was completed as part of the [Fullstack JavaScript Developer Nanodegree program on Udacity](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067).

## Getting Started

### Dependencies

* Docker
* Node.js

### Environment variables
This project requires a .env file at its root to run properly. It is not included in the git repository. Below is an example .env file that can be used to run the project quickly (not suitable for any production use):

```
# Environment
ENV=dev

# PostgreSQL
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=storefront_user
POSTGRES_PASSWORD=storefront_password

# Bcrypt
SALT_ROUNDS=10
BCRYPT_PASSWORD=enter-ye-who-are-secure

# JWT
TOKEN_SECRET=iAmAVerySecretTokenSecret
```

### Executing program
To start the server, follow these steps:

* Run `npm install` to install all required packages
* Run `db-migrate db:create storefront_dev` to create the dev database
* Run `db-migrate up` to apply all migrations
* Run `npm run start` to start the server

## Testing
To run unit tests, follow these steps:

* Run `npm run test` to set up the test database and execute test suites

## Author

William Raymond
