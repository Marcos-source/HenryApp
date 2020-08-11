const { Pool } = require('pg');

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const pool = new Pool({
  connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/henryapp`,
});

function db() {
  let client;
  const conn = pool.connect()
    .then((c) => {
      client = c;
    });
  function query(querystring) {
    if (!client) return Promise.reject(new Error('Client not initiated.'));
    return client.query(querystring)
      .then((result) => {
        if(result.command==='DELETE'){
          return [result.rowCount];
        }
        return result.rows});
  }
  function queryOne(querystring) {
    return query(querystring)
      .then((result) => result[0]);
  }
  function queryOneProp(querystring, prop) {
    return queryOne(querystring)
      .then((result) => result[prop]);
  }
  function dropPool() {
    return pool.end();
  }
  return {
    conn,
    query,
    queryOne,
    queryOneProp,
    dropPool,
  };
}

module.exports = db;
