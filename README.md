# Politico
A simple Node.js API that allows consumers (citizens) vote for politicians running for different government offices. Up to date version of project can be found on the `develop` branch.

[![Build Status](https://travis-ci.org/mazma1/politico.svg?branch=develop)](https://travis-ci.org/mazma1/politico)
[![Coverage Status](https://coveralls.io/repos/github/mazma1/politico/badge.svg?branch=develop)](https://coveralls.io/github/mazma1/politico?branch=develop)
[![codecov](https://codecov.io/gh/mazma1/politico/branch/develop/graph/badge.svg)](https://codecov.io/gh/mazma1/politico)

## Core Technologies
1. NodeJS/Express
2. Postgres/Sequelize ORM
3. Mocha & Chai

## To get started
1. Clone the repository: `git clone https://github.com/mazma1/politico`
2. Ensure you have installed [NodeJS](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/download/)
3. Navigate into the app's root directory: `cd politico`
5. Create a `.env` file in the root directory using the sample `.env.sample` file and update the credentials as specified.
6. Install all dependencies: `npm install`
7. Run tests to ensure the app is not broken: `npm test`
8. Run `npm run db:migrate` to populate your database with initial user data
9. Start the app: `npm run start:dev`

## Endpoints
Access to endpoints are restricted based on the authorization token assigned to the user. This token is generated when a new user signs up, and when a returning user signs in.

For more of the api, [go here.](https://politicobooth.docs.apiary.io)
