import { createTransport } from 'nodemailer';
import { convertPugFile } from './pug';
import { logger } from './winston';
import { StatusResponseInterface, LoggerInterface } from '../interfaces';
import { STATUS_OK, STATUS_INTERNAL_SERVER_ERROR } from './constants';
const transporter = createTransport({
    host: 'host',
    port: 587,
    secure: false,
    auth: {
        user: 'user',
        pass: 'password'
    }
});

interface MailOptionsInterface {
    to: string;
    subject: string;
    from: string;
    html: string;
}

export const emailWelcome = async (data: any): Promise<StatusResponseInterface> => {
    try {
        const pug = convertPugFile('emailWelcome.pug', data);
        const mailOptions: MailOptionsInterface = {
            to: data.email,
            subject: 'Bienvenido',
            from: 'correo@gmail.com',
            html: pug.data
        };
        const send = await sendMail(mailOptions);
        return send;
    } catch (error: any) {
        const dataLog: LoggerInterface = {
            level: 'error',
            message: error.message,
            functionName: 'emailWelcome',
            data
        };
        logger.log(dataLog);
        return { code: STATUS_INTERNAL_SERVER_ERROR, error: 'Ooops, lo sentimos pero ha ocurrido un error al intentar enviar el correo.' };
    }
};

const sendMail = async (mailOptions: MailOptionsInterface): Promise<StatusResponseInterface> => {
    try {
        await transporter.sendMail(mailOptions);
        return { code: STATUS_OK };
    } catch (error: any) {
        const dataLog: LoggerInterface = {
            level: 'error',
            message: error.message,
            functionName: 'sendMail',
            data: mailOptions
        };
        logger.log(dataLog);
        return { code: STATUS_INTERNAL_SERVER_ERROR, error: 'Ooops, lo sentimos pero ha ocurrido un error al intentar enviar el correo.' };
    }
};