import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { SwaggerInterface } from '../interfaces';

const options: SwaggerInterface = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Prueba Eduardo',
            version: '1.0.0',
            description: 'End Points Eduardo',
            contact: {
                name: 'SIMDATAGROUP',
                url: 'https://simdatagroup.com/'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Localhost server'
            }
        ]
    },
    apis: [
        `${path.join(__dirname, '../auth/*')}`,
        `${path.join(__dirname, '../inquiry/*')}`,
        `${path.join(__dirname, '../questions/*')}`
    ]
};

export const openapiSpecification = swaggerJsdoc(options);