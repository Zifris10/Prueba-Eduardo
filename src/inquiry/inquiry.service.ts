import { logger, STATUS_OK, STATUS_NOT_FOUND, STATUS_INTERNAL_SERVER_ERROR } from '../helpers';
import { LoggerInterface, GetDataFromDatabaseInterface, StatusResponseInterface, InquiryInterface, WhereUpdateDataInterface } from '../interfaces';
import { Inquiry } from '../models';

export class InquiryService {
    public static async findAndCountAll(data: GetDataFromDatabaseInterface): Promise<StatusResponseInterface> {
        try {
            const { count, rows } = await Inquiry.findAndCountAll(data);
            return { code: STATUS_OK, data: rows, total: count };
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'InquiryService.findAndCountAll',
                data
            };
            logger.log(dataLog);
            return { code: STATUS_INTERNAL_SERVER_ERROR, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' };
        }
    }

    public static async findOne(data: GetDataFromDatabaseInterface): Promise<StatusResponseInterface> {
        try {
            let dataSend: StatusResponseInterface = {
                code: STATUS_OK
            };
            const getInquiry = await Inquiry.findOne(data);
            if(getInquiry) {
                dataSend.data = getInquiry.dataValues;
            } else {
                dataSend.code = STATUS_NOT_FOUND;
                dataSend.error = 'Oops, lo sentimos pero no hemos logrado encontrar la encuesta.';
            }
            return dataSend;
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'InquiryService.findOne',
                data
            };
            logger.log(dataLog);
            return { code: STATUS_INTERNAL_SERVER_ERROR, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' };
        }
    }

    public static async create(data: InquiryInterface): Promise<StatusResponseInterface> {
        try {
            const createInquiry = await Inquiry.create(data);
            return { code: STATUS_OK, data: createInquiry.dataValues };
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'InquiryService.findOne',
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
                error: 'Oops, lo sentimos pero no hemos logrado actualizar la encuesta.'
            };
            const updateInquiry = await Inquiry.update(data, where);
            if(updateInquiry && updateInquiry.length && updateInquiry[0] > 0) {
                dataSend.code = STATUS_OK;
                delete dataSend.error;
            }
            return dataSend;
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'InquiryService.update',
                data
            };
            logger.log(dataLog);
            return { code: STATUS_INTERNAL_SERVER_ERROR, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' };
        }
    }
};