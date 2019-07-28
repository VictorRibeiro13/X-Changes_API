/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as BlueBird from 'bluebird';
import {
    UserInterface, UserInterfaceDetail, createUserByEmail, createUsers, createUserById,
} from './interface';

const model = require('../../db/index');

class User implements UserInterface {
    public id: number;

    public name: string;

    public email: string;

    public password: string;

    public create(user: any): any {
        return model.User.create(user);
    }

    public getAll(): BlueBird<UserInterface[]> {
        return model.User.findAll({
            order: ['name'],
        }).then(createUsers);
    }

    public getById(id: number): BlueBird<UserInterfaceDetail> {
        return model.User.findOne({
            where: { id },
        }).then(createUserById);
    }

    public getByEmail(email: string): BlueBird<UserInterfaceDetail> {
        return model.User.findOne({
            where: { email },
        }).then(createUserByEmail);
    }

    public update(id: number, user: any): any {
        return model.User.update(user, {
            where: { id },
            fields: ['name', 'email', 'password'],
            hooks: true,
            individualHooks: true,
        });
    }

    public delete(id: number): any {
        return model.User.destroy({
            where: { id },
        });
    }
}
export default User;
