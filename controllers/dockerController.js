const { exec } = require('child_process');

const dockerController = {
    listContainers: (req, res) => {
        exec('docker ps --format "{{.Names}}"', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao listar containers: ${error.message}`);
                return res.status(500).json({ error: 'Erro ao listar containers' });
            }

            const containers = stdout.trim().split('\n').map(nome => ({ nome }));
            res.json({ containers });
        });
    },
    listExitedContainers: (req, res) => {
        exec('docker ps -a --filter "status=exited" --format "{{.Names}}"', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao listar containers stopados: ${error.message}`);
                return res.status(500).json({ error: 'Erro ao listar containers stopados' });
            }

            const containersExited = stdout.trim().split('\n').map(nome => ({ nome }));
            res.json({ containers: containersExited });
        });
    },
    restartContainer: (req, res) => {
        const { radicalDoNomeContainer } = req.body;

        if (!radicalDoNomeContainer) {
            return res.status(400).json({ error: 'Radical do nome do container não informado' });
        }

        exec('docker ps -a --format "{{.Names}}"', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao listar containers: ${error.message}`);
                return res.status(500).json({ error: 'Erro ao listar containers' });
            }

            const containers = stdout.trim().split('\n').filter((container) => container.includes(radicalDoNomeContainer));

            if (containers.length === 0) {
                return res.status(404).json({ error: 'Nenhum container encontrado com base no radical do nome' });
            }

            containers.forEach((nomeContainer) => {
                const comandoRestartContainer = `docker restart ${nomeContainer}`;
                exec(comandoRestartContainer, (errorRestart, stdoutRestart, stderrRestart) => {
                    if (errorRestart) {
                        console.error(`Erro ao reiniciar o container ${nomeContainer}: ${errorRestart.message}`);
                    } else {
                        console.log(`Container ${nomeContainer} reiniciado com sucesso`);
                    }
                });
            });

            res.json({ message: 'Operações em containers concluídas' });
        });
    },
    deleteContainer: (req, res) => {
        const { radicalDoNomeContainer } = req.body;

        if (!radicalDoNomeContainer) {
            return res.status(400).json({ error: 'Radical do nome do container não informado' });
        }

        exec('docker ps -a --format "{{.Names}}"', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao listar containers: ${error.message}`);
                return res.status(500).json({ error: 'Erro ao listar containers' });
            }

            const containers = stdout.trim().split('\n').filter((container) => container.includes(radicalDoNomeContainer));

            if (containers.length === 0) {
                return res.status(404).json({ error: 'Nenhum container encontrado com base no radical do nome' });
            }

            containers.forEach((nomeContainer) => {
                const comandoDeleteContainer = `docker rm ${nomeContainer}`;
                exec(comandoDeleteContainer, (errorDelete, stdoutDelete, stderrDelete) => {
                    if (errorDelete) {
                        console.error(`Erro ao excluir o container ${nomeContainer}: ${errorDelete.message}`);
                    } else {
                        console.log(`Container ${nomeContainer} excluído com sucesso`);
                    }
                });
            });

            res.json({ message: 'Operações em containers concluídas' });
        });
    }
};

module.exports = dockerController;
