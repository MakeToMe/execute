const { exec } = require('child_process');

const infoController = {
    getPingInfo: (req, res) => {
        const { enderecoIP } = req.body;

        if (!enderecoIP) {
            return res.status(400).json({ error: 'Endereço IP não informado' });
        }

        exec(`ping -c 4 ${enderecoIP}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar o ping: ${error.message}`);
                return res.status(500).json({ error: 'Erro ao executar o ping' });
            }

            const linhas = stdout.split('\n');
            const stats = linhas.find(linha => linha.includes('packets transmitted'));
            const rtt = linhas.find(linha => linha.includes('rtt min/avg/max/mdev'));

            if (!stats || !rtt) {
                return res.status(500).json({ error: 'Não foi possível extrair as informações do ping' });
            }

            const regexStats = /(\d+) packets transmitted, (\d+) received, (\d+)% packet loss/;
            const regexRtt = /rtt min\/avg\/max\/mdev = ([\d\.]+)\/([\d\.]+)\/([\d\.]+)\/([\d\.]+)/;

            const [, pacotesEnviados, pacotesRecebidos, perda] = regexStats.exec(stats);
            const [, , latenciaMedia] = regexRtt.exec(rtt);

            const resposta = {
                'Pacotes enviados': pacotesEnviados,
                'Pacotes recebidos': pacotesRecebidos,
                'Percentual de entrega': `${100 - perda}%`,
                'Percentual de perda': `${perda}%`,
                'Latência média': `${latenciaMedia} ms`,
            };

            res.json(resposta);
        });
    },
    // Adicionar outros métodos
};

module.exports = infoController;
