const { Router } = require('express');
const { getAll, deleteOne, create, editOne, getRespuestaXPreguntas } = require('./entity');
const router = Router();

//Obtiene todas las preguntas.
router.get('/', (req, res, next) => {
  getAll()
  .then(response=>{
    res.send(response)
  })
  .catch(e=>{
    return e
  })
});
//AGARRA TODAS LAS RESPUESTAS DE UNA Pregunta
router.get('/respuestasxpregunta/:id', (req, res, next) => {
  var id = req.params.id;
  getRespuestaXPreguntas(id)
  .then(response=>{
    res.send(response)
  })
  .catch(e=>{
    return e
  })
});
//vrea una pregunta
router.post('/create', (req, res) => {
  const {pregunta,idRespuestaCorrecta} = req.body;
  create(pregunta,idRespuestaCorrecta)
  .then(response => {
        res.sendStatus(200)
      })
      .catch(e => {
        res.sendStatus(400)
      })
});

//Edita el contenido de la propiedad pregunta.
router.put('/editar/:id', (req, res, next) => {
  var nuevaPregunta = req.body.pregunta;
  var idPregunta = req.params.id;
  editOne(idPregunta, nuevaPregunta)
  .then(nuevaPregunta => {
    res.send(nuevaPregunta)
  }).catch(err => {
    next(err)
  });
});

//elimina una pregunta por id
router.delete('/eliminar/:id', (req, res, next) => {
  var id = req.params.id;
  deleteOne(id)
  .then(response=>{
    res.send(200)
  })
  .catch(e=>{
    return e
  })
})
module.exports = router;
