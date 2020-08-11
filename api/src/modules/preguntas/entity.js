const crypto = require('crypto');
const { query, queryOne, queryOneProp , dropPool} = require('../../db.js')();

async function create( pregunta, idRespuestaCorrecta ) {
  return queryOne(`INSERT INTO preguntas (pregunta,"idRespuestaCorrecta")
        VALUES ('${pregunta}', ${idRespuestaCorrecta});`)
};

function getAll() {
    return query('SELECT * FROM preguntas;');
};

function getRespuestaXPreguntas(id) {
    return query(`SELECT * FROM respuestas where "idPregunta" = ${id};`);
};

function editOne(id, nuevaPregunta) {
    return query(`UPDATE preguntas SET pregunta='${nuevaPregunta}' WHERE '${id}';`);
};

function deleteOne(id) {
     return query(`DELETE FROM preguntas Where id = '${id}';`);
};


module.exports = {
    create,
    getAll,
    editOne,
    deleteOne,
    getRespuestaXPreguntas
};
