const router = require('express').Router();

const ensureAuthentication = require('../middleware/authentication');
const { registerUser, loginUser, getUsers, getUserById } = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser)

router.get('/users', ensureAuthentication, getUsers);

router.get('/user/:id', ensureAuthentication, getUserById);

module.exports = router;