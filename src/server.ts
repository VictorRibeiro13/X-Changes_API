import * as http from 'http';
import Api from './api/api';

import * as models from './db/index';

const config = require('./config/env/config')();

const server = http.createServer(Api);

// realiza o sync dos models do bd (cria as tabelas antes de criar o servidor)
models.sequelize.sync({ force: true }).then((): void => {
    server.listen(config.serverPort);
    server.on('listening', (): void => console.log(`Rodando na porta: ${config.serverPort}`));
    server.on('error', (error: NodeJS.ErrnoException): void => console.log(`Ocorreu um erro inesperado: ${error}`));
});
