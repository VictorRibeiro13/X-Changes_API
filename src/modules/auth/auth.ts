/* eslint-disable no-prototype-builtins */
import { Request, Response } from 'express';
import * as _ from 'lodash';
import User from '../user/service';
import authSuccess from '../../api/responses/authSuccess';
import authFail from '../../api/responses/authFail';

const UserService = new User();

class TokenRoutes {
    public auth(req: Request, res: Response): any {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        };

        if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
            UserService.getByEmail(credentials.email)
                .then(_.partial(authSuccess, res, credentials))
                .catch(_.partial(authFail, req, res));
        }
    }
}

export default TokenRoutes;
