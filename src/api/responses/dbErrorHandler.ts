/**
 * A IDEIA EH EXPOR UM ERRO GENÉRICO AO USUÁRIO
 */

import { Response } from 'express';
import * as HTTPStatus from 'http-status';

export default function dbErrorHandler(res: Response, err: any, message: string): void{
    console.log(`Um erro no BD aconteceu: ${err}`);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        code: 'ERR-DB-01',
        message,
    });
}
