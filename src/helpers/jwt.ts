import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logger, STATUS_UNAUTHORIZED, STATUS_OK } from '../helpers';
import { LoggerInterface, GetDataFromDatabaseInterface } from '../interfaces';
import { UsersService } from '../users/users.service';
import { AdminsService } from '../admin/admin.service';
const SECRET_KEY: string = process.env.SECRET_TOKEN_JWT || 'PRUEBA-EDUARDO-JSONWEBTOKEN';

interface HeadersInterface {
    authorization: string
}

export const jwtGenerated = (data: any, expiresIn: string): string => {
    const token = jwt.sign(data, SECRET_KEY, {
        expiresIn
    });
    return token;
};

export const jwtVerifyAdministrator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers as HeadersInterface;
        const dataToken: any = jwt.verify(authorization, SECRET_KEY);
        if(dataToken && dataToken.idUser) {
            const { idUser } = dataToken;
            const dataUser: GetDataFromDatabaseInterface = {
                where: {
                    id: idUser,
                    deleted: 0
                },
                attributes: ['name']
            };
            const dataAdmin: GetDataFromDatabaseInterface = {
                where: {
                    userId: idUser,
                    deleted: 0
                },
                attributes: ['id']
            };
            const [ getUser, getAdmin ] = await Promise.all([
                UsersService.findOne(dataUser),
                AdminsService.findOne(dataAdmin)
            ]);
            if(getUser.code === STATUS_OK && getAdmin.code === STATUS_OK) {
                req.body.dataToken = idUser;
                next();
            } else {
                res.status(STATUS_UNAUTHORIZED).send({ code: STATUS_UNAUTHORIZED, error: 'Lo sentimos, pero este usuario no tiene permisos para esta sección.' });
            }
        }
    } catch (error: any) {
        const dataLog: LoggerInterface = {
            level: 'error',
            message: error.message,
            functionName: 'jwtVerifyAdministrator'
        };
        logger.log(dataLog);
        res.status(STATUS_UNAUTHORIZED).send({ code: STATUS_UNAUTHORIZED, error: 'El token de autentificación ha expirado.' });
    }
};