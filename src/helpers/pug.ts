import path from 'path';
import { renderFile } from 'pug';
import { logger } from './winston';
import { StatusResponseInterface, LoggerInterface } from '../interfaces';
import { STATUS_OK, STATUS_BAD_REQUEST } from './constants';

export const convertPugFile = (route: string, data: any): StatusResponseInterface => {
    try {
        const html: string = renderFile(path.resolve(__dirname, `../../emails/${route}`), data);
        return { code: STATUS_OK, data: html };
    } catch (error: any) {
        const dataLog: LoggerInterface = {
            level: 'error',
            message: error.message,
            functionName: 'convertPugFile'
        };
        logger.log(dataLog);
        return { code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero ocurrió un error al intentar crear el html.' };
    }
};