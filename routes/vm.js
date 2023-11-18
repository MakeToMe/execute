const express = require('express');
const router = express.Router();
const vmController = require('../controllers/vmController');
const verificarToken = require('../middlewares/auth');

router.use(verificarToken);
// Definição de rotas VM...
module.exports = router;
