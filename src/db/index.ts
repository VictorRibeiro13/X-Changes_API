/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable import/prefer-default-export */
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';

const config = require('../config/env/config')();

export const sequelize = new Sequelize({
    database: config.db,
    dialect: config.dialect,
    username: config.username,
    password: config.password,
});

sequelize.addModels([
    User,
]);

export * from './models/user.model';
