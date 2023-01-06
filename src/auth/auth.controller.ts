import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AdminsService } from '../admin/admin.service';
import { logger, validateEmpty, validateEmail, validateNotEmptySpaces, comparePassword, jwtGenerated, STATUS_OK, STATUS_BAD_REQUEST, STATUS_NOT_ACCEPTABLE } from '../helpers';
import { LoggerInterface, GetDataFromDatabaseInterface } from '../interfaces';

export class AuthController {
    public static async loginAdmins(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;
            if(validateEmpty(email)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero el email es requerido.' });
            if(validateEmail(email)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero el email es no tiene un formato válido.' });
            if(validateEmpty(password)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero la contraseña es requerida.' });
            if(validateNotEmptySpaces(password)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero la contraseña no debe tener espacios.' });
            const dataUser: GetDataFromDatabaseInterface = {
                attributes: ['id', 'password'],
                where: {
                    email,
                    deleted: 0
                }
            };
            const getUser = await UsersService.findOne(dataUser);
            if(getUser.code === STATUS_OK) {
                const { id: idUser, password: hashPassword } = getUser.data;
                const matchPassword = await comparePassword(password, hashPassword);
                if(matchPassword.code === STATUS_OK) {
                    const dataAdmin: GetDataFromDatabaseInterface = {
                        attributes: ['id'],
                        where: {
                            userId: idUser,
                            deleted: 0
                        }
                    };
                    const getAdmin = await AdminsService.findOne(dataAdmin);
                    if(getAdmin.code === STATUS_OK) {
                        const dataToken = {
                            idUser
                        };
                        const getToken = jwtGenerated(dataToken, '12h');
                        res.status(STATUS_OK).send({ code: STATUS_OK, data: getToken });
                    } else {
                        res.status(getAdmin.code).send(getAdmin);
                    }
                } else {
                    res.status(matchPassword.code).send(matchPassword);
                }
            } else {
                res.status(getUser.code).send(getUser);
            }
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'AuthController.loginUser'
            };
            logger.log(dataLog);
            res.status(STATUS_BAD_REQUEST).send({ code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' });
        }
    }

    public static async loginUsers(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;
            if(validateEmpty(email)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero el email es requerido.' });
            if(validateEmail(email)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero el email es no tiene un formato válido.' });
            if(validateEmpty(password)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero la contraseña es requerida.' });
            if(validateNotEmptySpaces(password)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero la contraseña no debe tener espacios.' });
            const dataUser: GetDataFromDatabaseInterface = {
                attributes: ['id', 'password'],
                where: {
                    email,
                    deleted: 0
                }
            };
            const getUser = await UsersService.findOne(dataUser);
            if(getUser.code === STATUS_OK) {
                const { id: idUser, password: hashPassword } = getUser.data;
                const matchPassword = await comparePassword(password, hashPassword);
                if(matchPassword.code === STATUS_OK) {
                    const dataToken = {
                        idUser
                    };
                    const getToken = jwtGenerated(dataToken, '12h');
                    res.status(STATUS_OK).send({ code: STATUS_OK, data: getToken });
                } else {
                    res.status(matchPassword.code).send(matchPassword);
                }
            } else {
                res.status(getUser.code).send(getUser);
            }
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'AuthController.loginUser'
            };
            logger.log(dataLog);
            res.status(STATUS_BAD_REQUEST).send({ code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' });
        }
    }
};