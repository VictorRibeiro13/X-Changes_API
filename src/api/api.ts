/* eslint-disable import/no-unresolved */
/* eslint-disable no-new */

import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import errorHandlerApi from './errorHandlerAPI'; // Importando função padrao , ao cirar mais,coloque enmtre chaves
import AuthConfig from '../auth';

class Api {
    public express: express.Application;

    public auth;

    public constructor() {
        this.express = express();
        this.auth = AuthConfig();
        this.middleware();
    }

    private middleware(): void {
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(errorHandlerApi);
        this.express.use(this.auth.initialize());
        this.router(this.express, this.auth);
    }

    private router(app: express.Application, auth: any): void {
        new Routes(app, auth);
    }
} export default new Api().express;
