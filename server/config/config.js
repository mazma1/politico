require('dotenv').config();

module.exports = {
  development: {
    username: "andeladeveloper",
    password: null,
    database: "politico-dev",
    host: "localhost",
    dialect: 'postgres'
  },
  test: {
    use_env_variable: process.env.TEST_URL,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: process.env.PROD_URL,
    dialect: 'postgres'
  },
};
