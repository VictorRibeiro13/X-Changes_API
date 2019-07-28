/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
import { api, request, expect } from './config/helpers';
import * as model from '../../src/db/index';

import httpStatus = require('http-status');

const config = require('../../src/config/env/config')();

describe('Testes de Integração', () => {
    let id;
    let token;

    const userTest = {
        id: 100,
        name: 'Test Victor',
        email: 'test@gmail.com',
        password: '123',
    };

    const userDefault = {
        id: 1,
        name: 'Default Victor',
        email: 'deafult@gmail.com',
        password: 'default',
    };

    beforeEach((done): void => {
        model.User.destroy({
            where: {},
        })
            .then(() => model.User.create(userDefault))
            .then((user) => {
                model.User.create(userTest)
                    .then(() => {
                        token = jwt.encode({ id: user.id }, config.secret);
                        done();
                    });
            });
    });

    describe('POST /token', () => {
        it('deve receber um JWT', done => {
            const credentials = {
                email: userDefault.email,
                password: userDefault.password,
            };
            request(api)
                .post('/token')
                .send(credentials)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.token).to.be.equal(`${token}`);
                    done(error);
                });
        });

        it('POST não deve gerar Token', done => {
            const credentials = {
                email: 'email@qualquer.com',
                password: 'password erradaaaa',
            };
            request(api)
                .post('/token')
                .send(credentials)
                .end((error, res) => {
                    expect(res.status).to.equal(httpStatus.UNAUTHORIZED);
                    // eslint-disable-next-line no-unused-expressions
                    expect(res.body).to.empty;
                    done(error);
                });
        });
    });

    describe('GET /api/users/all', (): void => {
        it('Deve retornar um Array com todos os Usuários', done => {
            request(api)
                .get('/api/users/all')
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                    expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                    done(error);
                });
        });
    });

    describe('GET /api/users/:id', (): void => {
        it('Deve retornar um Json com um Usuário', done => {
            request(api)
                .get(`/api/users/${userDefault.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.equal(userDefault.id);
                    expect(res.body.payload).to.have.all.keys([
                        'id', 'name', 'email', 'password',
                    ]);
                    done(error);
                });
        });
    });

    describe('POST /api/users/create', (): void => {
        it('Deve inserir novos Usuários', done => {
            const user = {
                id: 2,
                name: 'victorS2doritos_post',
                email: 'victors2doritos@gmail.com',
                password: 'newUser',
            };

            request(api)
                .post('/api/users/create')
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .send(user)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.eql(user.id); // eql (==) and equal(===)
                    expect(res.body.payload.name).to.eql(user.name);
                    expect(res.body.payload.email).to.eql(user.email);
                    done(error);
                });
        });
    });

    describe('PUT /api/users/:id/update', (): void => {
        it('Deve atualizar uma informação do Usuário', done => {
            const user = {
                name: 'victorS2doritos_put',
                email: 'update@gmail.com',
            };
            request(api)
                .put(`/api/users/${userDefault.id}/update`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .send(user)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    console.log(res.body.payload);
                    done(error);
                });
        });
    });

    describe('DELETE /api/users/:id/destroy', (): void => {
        it('Deve apagar Usuário', done => {
            request(api)
                .delete(`/api/users/${userDefault.id}/destroy`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.not.equal(userDefault.id);
                    done(error);
                });
        });
    });
});
