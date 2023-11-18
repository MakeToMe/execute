const multer = require('multer');
const path = require('path');

// Configuração do Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/home/execute/uploads'); // Pasta para receber os arquivos
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Mantém o nome original do arquivo
    }
});

const upload = multer({ storage: storage });

const uploadController = {
    uploadFile: (req, res) => {
        upload.single('arquivo')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // Erros específicos do Multer
                console.error(`Erro do Multer ao fazer upload: ${err.message}`);
                return res.status(500).json({ error: err.message });
            } else if (err) {
                // Erros desconhecidos
                console.error('Erro ao fazer upload do arquivo:', err);
                return res.status(500).json({ error: 'Erro ao fazer upload do arquivo' });
            }

            if (!req.file) {
                // Se nenhum arquivo foi recebido
                console.error('Erro: Nenhum arquivo foi recebido.');
                return res.status(400).json({ error: 'Arquivo não enviado' });
            }

            // Se o upload foi bem-sucedido
            console.log(`Arquivo ${req.file.originalname} recebido com sucesso e salvo em ${req.file.path}`);
            res.json({ message: 'Arquivo recebido com sucesso!', filename: req.file.originalname, path: req.file.path });
        });
    }
};

module.exports = uploadController;
