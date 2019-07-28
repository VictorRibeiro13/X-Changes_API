/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import User from './modules/user/service';

const config = require('./config/env/config')();

export default function AuthConfig(): any {
    const UserService = new User();

    const opts = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'), // extrai o token do header (JWT EM MAISCULO ?)
    };

    passport.use(new Strategy(opts, (jwtPayload, done): any => {
        UserService
            .getById(jwtPayload.id)
            .then(user => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email,
                    });
                }
                return done(null, false);
            })
            .catch(error => {
                done(error, null);
            });
    }));

    return {
        initialize: (): any => passport.initialize(),
        authenticate: (): any => passport.authenticate('jwt', { session: false }),
    };
}
