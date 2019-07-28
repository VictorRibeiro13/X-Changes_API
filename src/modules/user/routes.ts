import { Request, Response } from 'express';
import UserController from './controller';

let UserCtrl: UserController;

class UserRoutes {
    public constructor() {
        UserCtrl = new UserController();
    }

    public index(req: Request, res: Response): void {
        return UserCtrl.getAll(req, res);
    }

    public create(req: Request, res: Response): void {
        return UserCtrl.createUser(req, res);
    }

    public findOne(req: Request, res: Response): void {
        return UserCtrl.getById(req, res);
    }

    public update(req: Request, res: Response): void {
        return UserCtrl.updateUser(req, res);
    }

    public destroy(req: Request, res: Response): void {
        return UserCtrl.deleteUser(req, res);
    }
}

export default UserRoutes;
