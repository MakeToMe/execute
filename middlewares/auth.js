const authMiddleware = (req, res, next) => {
    const tokenEnviado = req.headers['x-token'];
    const tokenEsperado = process.env.X_TOKEN;

    if (!tokenEnviado) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    if (tokenEnviado !== tokenEsperado) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }

    next();
};

module.exports = authMiddleware;
