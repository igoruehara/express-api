const express = require('express');

const router = express.Router();

const authMiddleware = require('../../app/middlewares/AuthMiddleware');
const { request } = require('../../app/middlewares/RequestMiddleware');

/**
 * Open Routes
 */
router.get('/', (req, res) => res.json({ msg: 'okay' }));

const usersRoutes = router;
const sessionRoutes = router;
const UserRequest = require('../../app/requests/users/UserRequest');
const UserController = require('../../app/controllers/http/users/UserController');
const SessionController = require('../../app/controllers/http/auth/SessionController');

usersRoutes.post('/users/', request(UserRequest.post), UserController.store);
sessionRoutes.post('/sessions', SessionController.store);

/**
 * Global Middlewares
 */
router.use(authMiddleware);

/**
 * Private routes and own middlewares
 */

usersRoutes
  .get('/users', UserController.index)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.destroy);

/**
 * Constructor of routes
 */
const routes = [usersRoutes];
router.use(...routes);

module.exports = router;
