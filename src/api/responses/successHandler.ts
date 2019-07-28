/* eslint-disable import/prefer-default-export */
/**
 * NO FUTURO IMPLEMENTAR RESPOSTAS EM TOASTR AQUI
 */

import { Response } from 'express';
import * as HTTPStatus from 'http-status';

export function onSuccess(res: Response, data: any): void {
    res.status(HTTPStatus.OK).json({ payload: data });
}
