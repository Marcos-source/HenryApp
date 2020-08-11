const crypto = require('crypto');
const {
  conn, dropPool, query, queryOne, queryOneProp,
} = require('../../db.js')();

function randomSalt() {
  return crypto.randomBytes(20).toString('hex');
}

function encrypt(password, salt) {
  return crypto
    .createHmac('sha1', salt)
    .update(password)
    .digest('hex');
}

function getAll() {
  return query('SELECT * FROM users;');
}

function deleteAll() {
  return query('DELETE FROM users;');
}

function findByemail(email) {
  return queryOne(`SELECT * FROM users WHERE email = '${email}'`);
}

async function create({ email, password }) {
  if (!email || !password) throw new TypeError('Users needs a valid email and password');
  const salt = randomSalt();
  const hash = encrypt(password, salt);
  return queryOneProp(`INSERT INTO users (email, password, salt)
        VALUES ('${email}', '${hash}', '${salt}')
        RETURNING id;`, 'id');
}

async function authenticate({ email, password }) {
  return findByemail(email)
    .then((user) => {
      if (!user) return false;
      if (encrypt(password, user.salt) === user.password) {
        return {
          id: user.id,
          email: user.email,
        };
      }
      return false;
    });
}
module.exports = {
  conn,
  dropPool,
  getAll,
  deleteAll,
  findByemail,
  create,
  authenticate,
};
