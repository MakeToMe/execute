const express = require('express');
const router = express.Router();
const dockerController = require('../controllers/dockerController');
const verificarToken = require('../middlewares/auth');

// Aplicar o middleware de autenticação a todas as rotas deste arquivo
router.use(verificarToken);

// Rota para listar containers
router.get('/listcontainers', dockerController.listContainers);

// Rota para listar containers stopados
router.get('/listexited', dockerController.listExitedContainers);

// Rota para reiniciar e parar containers
router.post('/restartcontainer', dockerController.restartAndStopContainer);

// Rota para excluir containers
router.post('/deletecontainer', dockerController.deleteContainer);

module.exports = router;
