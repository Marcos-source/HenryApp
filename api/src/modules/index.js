const { Router } = require('express');
// import all routers;
const userRouter = require('./user/routes.js');
const quizzRouter = require('./quizz/routes.js');
const preguntasRouter = require('./preguntas/routes.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/quizz', quizzRouter);
router.use('/preguntas', preguntasRouter);
// router.use('/products', productRouter);

module.exports = router;
