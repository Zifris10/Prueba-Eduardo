import { Router } from 'express';
import { QuestionController } from './questions.controller';
import { jwtVerifyAdministrator } from '../helpers';

export const questionRoute: Router = Router();

questionRoute
    .put('/:questionId', jwtVerifyAdministrator, QuestionController.updateQuestion);

/**
 * @openapi
 * /questions/{questionId}:
 *   put:
 *     description: Update question
 *     tags: [QUESTIONS]
 *     parameters:
 *       - in: params
 *         name: questionId
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               responses:
 *                 type: object
 *           example:
 *             question: Encuesta Actualizada
 *             responses: [
 *               {
 *                 title: title,
 *                 descripcion: descripcion,
 *                 points: 10
 *               }
 *             ]
 *     responses:
 *       200:
 *         description: Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 error:
 *                   type: string
 *                   example: Specific error detail
 */