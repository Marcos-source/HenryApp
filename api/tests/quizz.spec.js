const supertest = require('supertest');
const app = require('../src/app.js');
const Quizz = require('../src/modules/quizz/entity');

const agent = supertest(app);
const createQuizz = {
  name: "QUIZZ DE PRUEBA",
  description: "DESCRIPCION DE PRUEBA",
  idclase:1,
};
const updateQuizz = {
  name: "UPDATE",
  description: "UPDATE",
  idclase:1,
};

const createQuizz2 = {
  name: "CREATE2",
  description: "CREATE2",
  idclase:1,
};
const prueba = {
  id:undefined
}
describe('Quizz', () => {
   before(() => Quizz.conn
     .then(() => Quizz.create(createQuizz))
     .then((result) => {
       createQuizz.id = result.id;
     })
    )
  describe('POST Crea un Quizz', () => {
    it('responde con 200', () => agent.post(`/quizz/create`)
    .send(createQuizz2)
    .expect(200)
    .then(r=>{
      prueba.id = r.body.id;
    }));
  });
  describe('DELETE Borra un Quizz', () => {
    it('responde con 200', () => agent.delete(`/quizz/delete/${prueba.id}`)
    .expect(200));
  });
  describe('PUT Actualiza un Quizz', () => {
    it('responde con 200', () => agent.put(`/quizz/update/${createQuizz.id}`)
    .send(updateQuizz)
    .expect(200));
  });
  describe('GET Obtiene todos los quizz/', () => {
    it('responde con 200', () => agent.get("/quizz")
      .expect(200));
  });
  describe('GET Obtiene un quizz por id /', () => {
    it('responde con 200', () => agent.get("/quizz/1")
      .expect(200));
  });
  describe('GET Obtiene todas las preguntas de todos los quizz /', () => {
    it('responde con 200', () => agent.get("/quizz/preguntas")
      .expect(200));
  });
  describe('GET optiene las preguntas de un quizz espesifico /', () => {
    it('responde con 200', () => agent.get("/quizz/preguntas/1")
      .expect(200));
  });
  after(() => {
    Quizz.deleteById(createQuizz.id)
      .then(() => Quizz.dropPool());
  });
});
