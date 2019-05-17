require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DEV_URL',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'TEST_URL',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'PROD_URL',
    dialect: 'postgres',
  },
};
