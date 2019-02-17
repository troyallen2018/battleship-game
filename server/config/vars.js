const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.API_SERVER_NODE_ENV,
  port: process.env.API_SERVER_PORT,
  mongo: {
    uri: process.env.API_SERVER_NODE_ENV === 'test'
      ? process.env.MONGO_URI_TESTS
      : process.env.MONGO_URI,
  },
  logs: process.env.API_SERVER_NODE_ENV === 'production' ? 'combined' : 'dev',
};
