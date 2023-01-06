import { Request, Response } from 'express';
import { QuestionsService } from './questions.service';
import { logger, validateEmpty, validateArray, validateInteger, STATUS_BAD_REQUEST, STATUS_NOT_ACCEPTABLE } from '../helpers';
import { LoggerInterface, WhereUpdateDataInterface } from '../interfaces';

export class QuestionController {
    public static async updateQuestion(req: Request, res: Response): Promise<any> {
        try {
            const { questionId } = req.params;
            const { question, responses } = req.body;
            if(validateEmpty(question)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero la pregunta es requerida.' });
            if(validateArray(responses)) return res.status(STATUS_NOT_ACCEPTABLE).send({ code: STATUS_NOT_ACCEPTABLE, error: 'Oops, lo sentimos pero las respuestas son requeridas.' });
            let isValid: boolean = true;
            let allResponses: any = [];
            responses.forEach((question: any) => {
                if(question.title && !validateEmpty(question.title) && question.descripcion && !validateEmpty(question.descripcion) && question.points && !validateInteger(String(question.points))) {
                    allResponses.push({
                        title: question.title,
                        descripcion: question.descripcion,
                        points: parseInt(question.points)
                    });
                } else {
                    isValid = false;
                }
            });
            if(isValid) {
                const data: any = {
                    question,
                    responses
                };
                const where: WhereUpdateDataInterface = {
                    where: {
                        id: questionId
                    }
                };
                const updateQuestion = await QuestionsService.update(data, where);
                res.status(updateQuestion.code).send(updateQuestion);
            } else {
                res.status(STATUS_BAD_REQUEST).send({ code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero la estructura de las respuestas no es válida.' });
            }
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'QuestionController.updateQuestion'
            };
            logger.log(dataLog);
            res.status(STATUS_BAD_REQUEST).send({ code: STATUS_BAD_REQUEST, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' });
        }
    }
};