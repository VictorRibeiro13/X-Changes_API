/* eslint-disable @typescript-eslint/no-explicit-any */

import { expect } from './config/helpers';
import User from '../../src/modules/user/service';
// import UserRoutes from '../../src/modules/user/routes';

describe('Testes Unitários Simples do Controller', (): any => { // descrição simples
    describe('Método Create (CRUD Usuário)', (): any => {
        /**
         * Caso o id já exista no banco de dados, ele vai dar erro, pois ele não deixa
         * criar um id que ja existe, para isso, basta dar um drop na tabela
         * ou reiniciar o servidor colocando a propriedade 'force' como true !
         */
        it('deve criar um novo Usuario (se ele já não existir)', (): any => {
            const newUser = {
                id: 302,
                name: 'Novo Usuário',
                email: 'novousuairo@gmail.com',
                password: '1234',
            };

            const user = new User();
            return user.create(newUser)
                .then((data): any => {
                    expect(data.dataValues).to.have.all.keys(
                        ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt'],
                    );
                });
        });
    });

    describe('Método Update (CRUD Usuário)', (): void => {
        it('Deve Atualizar um Usuário', (): void => {
            const usuarioAtualizado = {
                nome: 'Nome Atualizado',
                email: 'emailatualizado@gmail.com',
            };
            const user = new User();
            return user.update(1, usuarioAtualizado)
                .then((data): void => {
                    expect(data[0]).to.be.equal(1);
                });
        });
    });

    describe('Método Delete (CRUD Usuário)', (): void => {
        it('Deve Deletar um Usuário', (): void => {
            const user = new User();
            user.delete(1).then((data): void => {
                expect(data).to.be.equal(1);
            });
        });
    });

    describe('Método GET (CRUD Usuário)', (): void => {
        it('Deve retornar uma lista de todos os Usuários', (): any => {
            const user = new User();
            return user.getAll().then((data): void => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.all.keys(
                    ['email', 'id', 'name', 'password'],
                );
            });
        });
    });

    describe('Método GetByID (CRUD USUÁRIO)', (): void => {
        it('Deve retornar o usuário de acordo com o Id especificado', (): any => {
            const user = new User();
            return user.getById(302).then((data): void => {
                expect(data.id).to.be.equal(302);
            });
        });
    });

    describe('Método GetByEmail (CRUD USUÁRIO)', (): void => {
        it('Deve retornar o usuário de acordo com o E-mail especificado', (): any => {
            const user = new User();
            return user.getByEmail('novousuairo@gmail.com').then((data): void => {
                expect(data.email).to.be.equal('novousuairo@gmail.com');
            });
        });
    });
});
