import { logger, STATUS_OK, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from '../helpers';
import { LoggerInterface, StatusResponseInterface, QuestionsInterface, GetDataFromDatabaseInterface, WhereUpdateDataInterface } from '../interfaces';
import { Questions } from '../models';

export class QuestionsService {
    public static async bulkCreate(data: QuestionsInterface[]): Promise<StatusResponseInterface> {
        try {
            await Questions.bulkCreate(data);
            return { code: STATUS_OK };
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'QuestionsService.bulkCreate',
                data
            };
            logger.log(dataLog);
            return { code: STATUS_INTERNAL_SERVER_ERROR, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' };
        }
    }

    public static async findAll(data: GetDataFromDatabaseInterface): Promise<StatusResponseInterface> {
        try {
            const getQuestions = await Questions.findAll(data);
            return { code: STATUS_OK, data: getQuestions };
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'QuestionsService.findAll',
                data
            };
            logger.log(dataLog);
            return { code: STATUS_INTERNAL_SERVER_ERROR, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' };
        }
    }

    public static async update(data: any, where: WhereUpdateDataInterface): Promise<StatusResponseInterface> {
        try {
            let dataSend: StatusResponseInterface = {
                code: STATUS_NOT_FOUND,
                error: 'Oops, lo sentimos pero no hemos logrado actualizar la pregunta.'
            };
            const updateQuestion = await Questions.update(data, where);
            if(updateQuestion && updateQuestion.length && updateQuestion[0] > 0) {
                dataSend.code = STATUS_OK;
                delete dataSend.error;
            }
            return dataSend;
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'QuestionsService.update',
                data
            };
            logger.log(dataLog);
            return { code: STATUS_INTERNAL_SERVER_ERROR, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' };
        }
    }
};