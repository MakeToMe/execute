const { exec } = require('child_process');

const vmController = {
    executeCommand: (req, res) => {
        const { Comando, Caminho } = req.body;

        if (!Comando) {
            return res.status(400).json({ error: 'Comando não informado' });
        }

        const comandoCompleto = Caminho ? `cd ${Caminho} && ${Comando}` : Comando;

        exec(comandoCompleto, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar o comando: ${error.message}`);
                return res.status(500).json({ error: 'Erro ao executar o comando' });
            }

            // Enviar o conteúdo do LOG como resposta
            res.json({ log: stdout });
        });
    }
};

module.exports = vmController;
