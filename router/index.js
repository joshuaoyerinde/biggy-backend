const express = require('express');
const router = express.Router();
const Auth = require('../Controllers/auth');

//..routing proccess
router.post('/auth/register/:id', Auth.register);
// router.post('/auth/login', Auth.login)

module.exports = router       