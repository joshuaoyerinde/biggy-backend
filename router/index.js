const express = require('express');
const router = express.Router();
const Auth = require('../Controllers/auth');

//..routing proccess
router.post('/auth/register/:id', Auth.register);
router.post('/auth/login', Auth.login)
router.get('/info', Auth.winInfoList)

module.exports = router       