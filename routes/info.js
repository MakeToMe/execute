const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
const verificarToken = require('../middlewares/auth');

router.use(verificarToken);

// Rota para obter informações de ping
router.post('/ping', infoController.getPingInfo);

module.exports = router;
