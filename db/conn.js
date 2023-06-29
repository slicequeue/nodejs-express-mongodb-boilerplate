const { MongoClient } = require('mongodb');
const config = require('../config');
const logger = require('../src/lib/logger');

const connUrl = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`;

const client = new MongoClient(connUrl);

client.on('connectionCreated', (event) => {
  logger.info('mongodb connection created.');
});

client.on('connectionClosed', (event) => {
  logger.info('mongodb connection closed.');
});

let conn;
let db;

const connect = async () => {
  try {
    conn = await client.connect();
  } catch (err) {
    console.error(err);
  }
  db = conn.db(config.db.database);
  return 'mongodb connection success.'
}

connect()
  .then(logger.info)
  .catch(logger.error);

module.exports = {
  client,
  db,
};
