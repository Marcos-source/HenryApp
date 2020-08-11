const supertest = require('supertest');
const app = require('../src/app.js');
const User = require('../src/modules/user/entity');

const agent = supertest(app);

const validUser = {
  email: 'valid@email.com',
  password: 'validPassword',
};
const invalidUser = {
  email: 'notavalidemail',
  password: 'password',
};
const createdUser = {
  email: 'created@email.com',
  password: 'passsword!',
};

describe('Users', () => {
  before(() => User.conn
    .then(() => User.deleteAll())
    .then(() => User.create(createdUser))
    .then((result) => {
      console.log(result);
      createdUser.id = result;
    }));
  describe('GET /', () => {
    it('responde con 200', () => agent.get('/user')
      .expect(200));
  });
  after(() => {
    User.deleteAll()
      .then(() => User.dropPool());
  }); // dejo la db cómo estaba
});
