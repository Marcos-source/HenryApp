const { Router } = require('express');
const router = Router();
const entity = require('./entity.js')

//obtiene todas las preguntas de todas las quizz y sus respuestas correctas
router.get('/preguntas',(req, res, next)=>{
  entity.getAllPreguntas()
  .then(response=>{
    if(response.length>0) return res.send(response)
    res.sendStatus(404)
  })
  .catch(e=>{
    next(e)
  })
})
//optiene todas las quizz
router.get('/',(req, res, next)=>{
  entity.getAll()
  .then(response=>{
    if(response.length>0) return res.send(response)
    res.sendStatus(404)
  })
  .catch(e=>{
    next(e)
  })
})
//optiene todas las quizz por id
router.get('/:id',(req, res, next)=>{
  const {id} = req.params;
  entity.getById(id)
  .then(response=>{
    if(response.length>0) return res.send(response)
    res.sendStatus(404)
  })
  .catch(e=>{
    next(e)
  })
})
//obtiene todas las preguntas de un quizz y sus respuestas correctas
router.get('/preguntas/:id',(req, res, next)=>{
  const {id} = req.params
  entity.getPreguntasById(id)
  .then(response=>{
    if(response.length>0) return res.send(response)
    res.sendStatus(404)
  })
  .catch(e=>{
    next(e)
  })
});
//crea una quizz
router.post('/create', async(req, res, next) => {
  const {name,description,idclase} = req.body;
  const quizz = {
    name,
    description,
    idclase
  }
  entity.create(quizz)
  .then(response => {
        res.send(response)
      })
      .catch(e => {
        next(e)
      })
});
//elimina una quizz
router.delete('/delete/:id', (req, res, next) => {
  const {id} = req.params;
  entity.deleteById(id)
  .then(response => {
      if(response===1) return res.sendStatus(200)
      res.sendStatus(404)
      })
      .catch(e => {
        next(e)
      })
});

//actualiza una quizz
router.put('/update/:id', (req, res, next) => {
  const {id} = req.params;
  const {idclase,name,description} = req.body;
  const quizz = {
    name,
    description,
    idclase
  }
  entity.updateById(id,quizz)
  .then(response => {
        res.sendStatus(200)
      })
      .catch(e => {
        next(e)
      })
});
module.exports = router;
