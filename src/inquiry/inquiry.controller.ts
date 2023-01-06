import { Request, Response } from 'express';
import { InquiryService } from '../inquiry/inquiry.service';
import { QuestionsService } from '../questions/questions.service';
import { logger, validateEmpty, validateArray, validateInteger, generatedShortid, STATUS_OK, STATUS_BAD_REQUEST, STATUS_NOT_ACCEPTABLE, STATUS_NOT_FOUND } from '../helpers';
import { LoggerInterface, GetDataFromDatabaseInterface, InquiryInterface, StatusResponseInterface, WhereUpdateDataInterface } from '../interfaces';

interface QueryInquiry {
    limit?: string;
    offset?: string;
}

export class InquiryController {
    public static async createInquiry(req: Request, res: Response): Promise<any> {
        try {
            const { name, questions, dataToken } = req.body;
            if(validateEmpty(name)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero el nombre es requerido.' });
            if(validateArray(questions)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero las preguntas son requeridas.' });
            if(questions.length !== 5) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero las preguntas deben ser solo 5.' });
            const questionsAreValid = validQuestions(questions);
            if(questionsAreValid.code === STATUS_OK) {
                const shortId: string = generatedShortid();
                const dataInquiry: InquiryInterface = {
                    id: shortId,
                    name: name.trim(),
                    createdBy: dataToken
                };
                const createInquiry = await InquiryService.create(dataInquiry);
                if(createInquiry.code === STATUS_OK) {
                    questionsAreValid.data.forEach((item: any) => {
                        item.inquiryId = shortId;
                    });
                    const createQuestions = await QuestionsService.bulkCreate(questionsAreValid.data);
                    if(createQuestions.code === STATUS_OK) {
                        res.status(createInquiry.code).send(createInquiry);
                    } else {
                        res.status(createQuestions.code).send(createQuestions);
                    }
                } else {
                    res.status(createInquiry.code).send(createInquiry);
                }
            } else {
                res.status(STATUS_BAD_REQUEST).send({ code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero la estructura de las preguntas no es válida.' });
            }
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'InquiryController.createInquiry'
            };
            logger.log(dataLog);
            res.status(STATUS_BAD_REQUEST).send({ code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' });
        }
    }

    public static async getInquirys(req: Request, res: Response): Promise<void> {
        try {
            const { limit, offset } = req.query as QueryInquiry;
            const dataInquiry: GetDataFromDatabaseInterface = {
                attributes: ['id', 'name'],
                order: [
                    ['name', 'ASC']
                ],
                where: {
                    deleted: 0
                },
                limit: limit && !isNaN(parseInt(limit)) ? parseInt(limit) : 20,
                offset: offset && !isNaN(parseInt(offset)) ? parseInt(offset) : 0
            };
            const getInquirys = await InquiryService.findAndCountAll(dataInquiry);
            res.status(getInquirys.code).send(getInquirys);
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'InquiryController.getInquirys'
            };
            logger.log(dataLog);
            res.status(STATUS_BAD_REQUEST).send({ code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' });
        }
    }

    public static async getInquiryById(req: Request, res: Response): Promise<void> {
        try {
            const { inquiryId } = req.params;
            const dataInquiry: GetDataFromDatabaseInterface = {
                attributes: ['id', 'name'],
                where: {
                    deleted: 0,
                    id: inquiryId
                }
            };
            const dataQuestions: GetDataFromDatabaseInterface = {
                attributes: ['id', 'question', 'responses'],
                where: {
                    inquiryId
                },
                limit: 5
            };
            const [ getInquiry, getQuestions ] = await Promise.all([
                InquiryService.findOne(dataInquiry),
                QuestionsService.findAll(dataQuestions)
            ]);
            if(getInquiry.code === STATUS_OK && getQuestions.code === STATUS_OK) {
                const dataSend: StatusResponseInterface = {
                    code: STATUS_OK,
                    data: {
                        inquiry: getInquiry.data,
                        questions: getQuestions.data
                    }
                };
                res.status(STATUS_OK).send(dataSend);
            } else {
                res.status(STATUS_NOT_FOUND).send({ code: STATUS_NOT_FOUND, error: 'Ooops, lo sentimos pero no hemos logrado encontrar la información.' });
            }
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'InquiryController.getInquiryById'
            };
            logger.log(dataLog);
            res.status(STATUS_BAD_REQUEST).send({ code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' });
        }
    }

    public static async deleteInquirys(req: Request, res: Response): Promise<void> {
        try {
            const { inquiryId } = req.params;
            const { dataToken } = req.body;
            const data: any = {
                deleted: 1,
                deletedBy: dataToken
            };
            const where: WhereUpdateDataInterface = {
                where: {
                    id: inquiryId
                }
            };
            const deleteInquirys = await InquiryService.update(data, where);
            res.status(deleteInquirys.code).send(deleteInquirys);
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'InquiryController.deleteInquirys'
            };
            logger.log(dataLog);
            res.status(STATUS_BAD_REQUEST).send({ code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' });
        }
    }

    public static async updateInquirys(req: Request, res: Response): Promise<any> {
        try {
            const { inquiryId } = req.params;
            const { name } = req.body;
            if(validateEmpty(name)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero el nombre es requerido.' });
            const data: any = {
                name
            };
            const where: WhereUpdateDataInterface = {
                where: {
                    id: inquiryId
                }
            };
            const updateInquirys = await InquiryService.update(data, where);
            res.status(updateInquirys.code).send(updateInquirys);
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'InquiryController.updateInquirys'
            };
            logger.log(dataLog);
            res.status(STATUS_BAD_REQUEST).send({ code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' });
        }
    }
};

const validQuestions = (questions: any): StatusResponseInterface => {
    try {
        let isValid: boolean = true;
        let allQuestions: any = [];
        questions.forEach((question: any) => {
            if(question.question && !validateEmpty(question.question) && question.responses && question.responses.length) {
                let allResponses: any = [];
                const shortId: string = generatedShortid();
                question.responses.forEach((response: any) => {
                    if(response.title && !validateEmpty(response.title) && response.descripcion && !validateEmpty(response.descripcion) && response.points && !validateInteger(String(response.points))) {
                        allResponses.push({
                            title: response.title,
                            descripcion: response.descripcion,
                            points: parseInt(response.points)
                        });
                    } else {
                        isValid = false;
                    }
                });
                allQuestions.push({
                    id: shortId,
                    question: question.question,
                    responses: allResponses
                });
            } else {
                isValid = false;
            }
        });
        const code: number = isValid ? STATUS_OK : STATUS_NOT_ACCEPTABLE;
        return { code, data: allQuestions };
    } catch (error: any) {
        const dataLog: LoggerInterface = {
            level: 'error',
            message: error.message,
            functionName: 'validQuestions',
            data: questions
        };
        logger.log(dataLog);
        return { code: STATUS_NOT_ACCEPTABLE };
    }
};