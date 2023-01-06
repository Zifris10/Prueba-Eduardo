import { Router } from 'express';
import { InquiryController } from './inquiry.controller';
import { jwtVerifyAdministrator } from '../helpers';

export const inquiryRoute: Router = Router();

inquiryRoute
    .post('/', jwtVerifyAdministrator, InquiryController.createInquiry)
    .get('/', jwtVerifyAdministrator, InquiryController.getInquirys)
    .get('/:inquiryId', jwtVerifyAdministrator, InquiryController.getInquiryById)
    .delete('/:inquiryId', jwtVerifyAdministrator, InquiryController.deleteInquirys)
    .put('/:inquiryId', jwtVerifyAdministrator, InquiryController.updateInquirys);

/**
 * @openapi
 * /inquirys/:
 *   post:
 *     description: Add inquiry
 *     tags: [INQUIRYS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               questions:
 *                 type: object
 *           example:
 *             name: Primer Encuesta
 *             questions: [
 *               {
 *                 question: ¿Cómo calificas la limpieza?,
 *                 responses: [
 *                   {
 *                     title: title,
 *                     descripcion: descripcion,
 *                     points: 10
 *                   }
 *                 ]
 *               },
 *               {
 *                 question: ¿Cómo calificas la limpieza?,
 *                 responses: [
 *                   {
 *                     title: title,
 *                     descripcion: descripcion,
 *                     points: 10
 *                   }
 *                 ]
 *               },
 *               {
 *                 question: ¿Cómo calificas la limpieza?,
 *                 responses: [
 *                   {
 *                     title: title,
 *                     descripcion: descripcion,
 *                     points: 10
 *                   }
 *                 ]
 *               },
 *               {
 *                 question: ¿Cómo calificas la limpieza?,
 *                 responses: [
 *                   {
 *                     title: title,
 *                     descripcion: descripcion,
 *                     points: 10
 *                   }
 *                 ]
 *               },
 *               {
 *                 question: ¿Cómo calificas la limpieza?,
 *                 responses: [
 *                   {
 *                     title: title,
 *                     descripcion: descripcion,
 *                     points: 10
 *                   }
 *                 ]
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
 *                 data:
 *                   type: object
 *                   example: {
 *                     deleted: 0,
 *                     id: NRusSiTglf,
 *                     name: Primer Encuesta,
 *                     createdBy: bJ9VI4e1E,
 *                     createdAt: 2023-01-06T03:47:29.633Z,
 *                     updatedAt: 2023-01-06T03:47:29.633Z
 *                   }
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

/**
 * @openapi
 * /inquirys/?limit=20&offset=20:
 *   get:
 *     description: Get inquirys
 *     tags: [INQUIRYS]
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
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
 *                 data:
 *                   type: object
 *                   example: [{
 *                     id: NRusSiTglf,
 *                     name: Primer Encuesta
 *                   }]
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

/**
 * @openapi
 * /inquirys/{inquiryId}:
 *   get:
 *     description: Get inquiry by id
 *     tags: [INQUIRYS]
 *     parameters:
 *       - in: params
 *         name: inquiryId
 *         schema:
 *           type: string
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
 *                 data:
 *                   type: object
 *                   example: {
 *                     inquiry: {
 *                       id: NRusSiTglf,
 *                       name: Primer Encuesta
 *                     },
 *                     questions: [
 *                       {
 *                         id: shortid1,
 *                         question: ¿Cómo calificas la limpieza?,
 *                         responses: [
 *                           {
 *                             title: title,
 *                             descripcion: descripcion,
 *                             points: 10
 *                           }
 *                         ]
 *                       },
 *                       {
 *                         id: shortid2,
 *                         question: ¿Cómo calificas la limpieza?,
 *                         responses: [
 *                           {
 *                             title: title,
 *                             descripcion: descripcion,
 *                             points: 10
 *                           }
 *                         ]
 *                       },
 *                       {
 *                         id: shortid3,
 *                         question: ¿Cómo calificas la limpieza?,
 *                         responses: [
 *                           {
 *                             title: title,
 *                             descripcion: descripcion,
 *                             points: 10
 *                           }
 *                         ]
 *                       },
 *                       {
 *                         id: shortid4,
 *                         question: ¿Cómo calificas la limpieza?,
 *                         responses: [
 *                           {
 *                             title: title,
 *                             descripcion: descripcion,
 *                             points: 10
 *                           }
 *                         ]
 *                       },
 *                       {
 *                         id: shortid5,
 *                         question: ¿Cómo calificas la limpieza?,
 *                         responses: [
 *                           {
 *                             title: title,
 *                             descripcion: descripcion,
 *                             points: 10
 *                           }
 *                         ]
 *                       }
 *                     ]
 *                   }
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

/**
 * @openapi
 * /inquirys/{inquiryId}:
 *   delete:
 *     description: Delete inquiry
 *     tags: [INQUIRYS]
 *     parameters:
 *       - in: params
 *         name: inquiryId
 *         schema:
 *           type: string
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

/**
 * @openapi
 * /inquirys/{inquiryId}:
 *   put:
 *     description: Update inquiry
 *     tags: [INQUIRYS]
 *     parameters:
 *       - in: params
 *         name: inquiryId
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: Encuesta Actualizada
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