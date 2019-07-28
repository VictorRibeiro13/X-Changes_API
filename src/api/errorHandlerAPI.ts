import {
    Request, Response, ErrorRequestHandler, NextFunction,
} from 'express';

// eslint-disable-next-line max-len
export default function errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): void{
    console.error(`API error Handler foi chamada !! . erro: ${err.name}`);
    res.status(500).json({
        errorCode: 'ERR-001',
        message: 'Erro Interno do Servidor',
    });
}
