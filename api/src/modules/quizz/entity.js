const crypto = require('crypto');
const schemaQuizz = require('./schema')
const { query, queryOne, queryOneProp , dropPool, conn} = require('../../db.js')();

function getAll() {
  return query('SELECT * FROM quizz;');
}

async function getById(value) {
  var id = parseInt(value,10);
  if(Number.isNaN(id)){
    throw {
      status: 400,
      message: "Error el id no es valido",
    };
  }else {
    return query(`SELECT * FROM quizz where id = ${id};`)
  }
}

async function getPreguntasById(value) {
  var id = parseInt(value,10);
  if(Number.isNaN(id)){
    throw {
      status: 400,
      message: "Error el id no es valido",
    }
  }else {
    return query(`
                select * from quizz
                inner join quizzxpreguntas
                on quizzxpreguntas."idQuizz"=quizz.id
                inner join preguntas
                on preguntas.id = quizzxpreguntas."idPregunta"
                inner join respuestas
                on respuestas."idPregunta"=preguntas.id
                where quizz.id=${id} and respuestas."respuestaCorrecta"=true;`)
  }
}

function getAllPreguntas() {
  return query(`
              select quizzxpreguntas."idQuizz", quizz.name ,quizz.description, quizzxpreguntas."idPregunta", preguntas.pregunta , respuestas.response, respuestas."respuestaCorrecta" from quizz
              inner join quizzxpreguntas
              on quizzxpreguntas."idQuizz"=quizz.id
              inner join preguntas
              on preguntas.id = quizzxpreguntas."idPregunta"
              inner join respuestas
              on preguntas.id=respuestas."idPregunta" and respuestas."respuestaCorrecta"=true;`);
}

async function create(quizz) {
  try {
    const value = await schemaQuizz.validateAsync(quizz);
    const {
      name, description, idclase
    } = value;
    return queryOne(`insert into quizz (name,description,"idClase")
    values('${quizz.name}','${quizz.description}',${quizz.idclase})
    RETURNING id;`,'id')
   }
 catch (err) {
    throw {
      status: 400,
      message: err,
    };
  }
}

async function deleteById(value) {
  var id = parseInt(value,10);
  if(Number.isNaN(id)){
    throw {
      status: 400,
      message: "Error el id no es valido",
    }
  }else {
    return queryOne(`DELETE FROM quizz Where id = '${id}';`)
  }
}


function deleteAll() {
  return queryOne(`DELETE FROM quizz;`);
}

async function updateById(id,quizz) {
  try {
    const value = await schemaQuizz.validateAsync(quizz);
    const {
      idclase, name, description
    } = value;
    return queryOne(`update quizz
       set name='${quizz.name}', description='${quizz.description}', "idClase"=${quizz.idclase}
        where id=${id};`)
   }
 catch (err) {
    throw {
      status: 400,
      message: err,
    };
  }
}

module.exports = {
  getAll,
  updateById,
  create,
  deleteById,
  getById,
  getAllPreguntas,
  getPreguntasById,
  dropPool,
  conn,
  deleteAll
};
