import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';
import { Request, Response } from 'express';
import User from './service';
import { onError } from '../../api/responses/errorHandler';
import { onSuccess } from '../../api/responses/successHandler';
import dbError from '../../api/responses/dbErrorHandler';

class UserController {
    private UserService: User;

    public constructor() {
        this.UserService = new User();
    }

    public getAll(req: Request, res: Response): void{
        this.UserService.getAll()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao buscar todos os Usuários'));
    }

    public createUser(req: Request, res: Response): void{
        this.UserService.create(req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbError, res, 'Erro ao Criar um usuário'))
            .catch(_.partial(onError, res, 'Erro ao Inserir Usuário'));
    }

    public getById(req: Request, res: Response): void{
        const UserId = parseInt(req.params.id, 10);
        this.UserService.getById(UserId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Usuário não encontrado'));
    }

    public updateUser(req: Request, res: Response): void {
        const UserId = parseInt(req.params.id, 10);
        const props = req.body;

        this.UserService.update(UserId, props)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Falha ao atualizar Usuário'));
    }

    public deleteUser(req: Request, res: Response): void {
        const UserId = parseInt(req.params.id, 10);
        this.UserService.delete(UserId)
            .then((data): void => {
                res.status(HTTPStatus.OK).json({ payload: data });
            })
            .catch((err): void => {
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao excluir o Usuário !!' });
                console.log(err);
            });
    }
}

export default UserController;
