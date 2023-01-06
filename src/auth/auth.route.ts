import { Router } from 'express';
import { AuthController } from './auth.controller';

export const authRoute: Router = Router();

authRoute
    .post('/admins', AuthController.loginAdmins)
    .post('/users', AuthController.loginUsers);

/**
 * @openapi
 * /auth/admins:
 *   post:
 *     description: Login admin
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *           example:
 *             email: eduardom362@gmail.com
 *             password: hola123
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
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOiJob2xhIiwiaWF0IjoxNjcxNTYyMzA2LCJleHAiOjE2NzE1NjU5MDZ9.tCDbycpdUvFFjdiQJ7mJBw03aHSYiIF3KqdqNqYB6VQ
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
 * /auth/users:
 *   post:
 *     description: Login admin
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *           example:
 *             email: eduardosolousuario@gmail.com
 *             password: hola123
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
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOiJob2xhIiwiaWF0IjoxNjcxNTYyMzA2LCJleHAiOjE2NzE1NjU5MDZ9.tCDbycpdUvFFjdiQJ7mJBw03aHSYiIF3KqdqNqYB6VQ
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