const { Router } = require('express');
const UserController = require('./controllers/UserController');
const Auth = require('./middlewares/Auth')

const routes = Router();

routes.post('/user/auth', UserController.auth)

routes.use(Auth)
routes.get('/user', UserController.users)
routes.post('/user', UserController.create)
routes.put('/user/:id', UserController.update)
routes.delete('/user/:id', UserController.remove)
module.exports = routes;