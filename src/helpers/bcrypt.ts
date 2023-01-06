import { hash, compare } from 'bcrypt';
import { logger } from './winston';
import { StatusResponseInterface, LoggerInterface } from '../interfaces';
import { STATUS_OK, STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED } from './constants';

export const convertPassword = async (password: string): Promise<StatusResponseInterface> => {
    try {
        const newPassword: string = await hash(password, 10);
        return { code: 200, data: newPassword };
    } catch (error: any) {
        const dataLog: LoggerInterface = {
            level: 'error',
            message: error.message,
            functionName: 'convertPassword'
        };
        logger.log(dataLog);
        return { code: 500, error: 'Oops, lo sentimos pero ocurrió un error al intentar encriptar la contraseña.' };
    }
};

export const comparePassword = async (password: string, hashPassword: string): Promise<StatusResponseInterface> => {
    let code: number = STATUS_OK;
    try {
        const matchPassword: boolean = await compare(password, hashPassword);
        if (!matchPassword) code = STATUS_UNAUTHORIZED;
    } catch (error: any) {
        const dataLog: LoggerInterface = {
            level: 'error',
            message: error.message,
            functionName: 'comparePassword'
        };
        logger.log(dataLog);
        code = STATUS_BAD_REQUEST;
    } finally {
        return { code, error: 'Oops, lo sentimos pero ocurrió un error al intentar validar la contraseña.' };
    }
};