require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const porta = process.env.PORT || 8385;
const ip = process.env.APP_IP || 'localhost';

// Middleware de autenticação
const authMiddleware = require('./middlewares/auth');

// Middlewares
app.use(bodyParser.json());

// Aplicar o middleware de autenticação a todas as rotas
app.use(authMiddleware);

// Importando rotas
const dockerRoutes = require('./routes/docker');
const vmRoutes = require('./routes/vm');
const uploadRoutes = require('./routes/upload');
const infoRoutes = require('./routes/info');

// Rotas
app.use('/docker', dockerRoutes);
app.use('/vm', vmRoutes);
app.use('/upload', uploadRoutes);
app.use('/info', infoRoutes);

// Middleware para capturar erros
app.use((err, req, res, next) => {
    console.error('Erro interceptado pelo middleware:', err.stack);
    res.status(500).send('Algo deu errado!');
});

// Iniciar o servidor
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
