const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const verificarToken = require('../middlewares/auth');

router.use(verificarToken);
router.post('/', uploadController.uploadFile);

module.exports = router;
