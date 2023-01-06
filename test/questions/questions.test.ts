import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
import { STATUS_OK, STATUS_NOT_FOUND, STATUS_BAD_REQUEST, STATUS_NOT_ACCEPTABLE, HOST_TESTING } from '../../src/helpers';
const server = request(HOST_TESTING);
let token: string;

beforeAll(async () => {
    const dataAuth = {
        email: 'eduardom362@gmail.com',
        password: 'hola123'
    };
    const res = await server.post('/auth/admins').send(dataAuth);
    token = res.body.data;
});

describe('PUT /questions/:questionId', () => {
    const urlAPI = '/questions/';
    const typeAPI = 'put';
    let Authorization = {
        authorization: ''
    };

    beforeAll(() => {
        Authorization.authorization = token;
    });

    test(`When we don't send information`, async () => {
        const res = await server[typeAPI](`${urlAPI}shortid`).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
  
    test(`When question is undefined`, async () => {
        const data = {};
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When question is number`, async () => {
        const data = {
            question: 123
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When question is json`, async () => {
        const data = {
            question: {}
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When question is null`, async () => {
        const data = {
            question: null
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When question is array`, async () => {
        const data = {
            question: [123]
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
  
    test(`When question is empty`, async () => {
        const data = {
            question: ''
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When responses is undefined`, async () => {
        const data = {
            question: 'Editada'
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When responses is number`, async () => {
        const data = {
            question: 'Editada',
            responses: 123
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When responses is json`, async () => {
        const data = {
            question: 'Editada',
            responses: {}
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When responses is null`, async () => {
        const data = {
            question: 'Editada',
            responses: null
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When responses is empty array`, async () => {
        const data = {
            question: 'Editada',
            responses: []
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When responses is array not valid`, async () => {
        const data = {
            question: 'Editada',
            responses: [123, 123]
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
    
    test(`When questionId not found`, async () => {
        const data = {
            question: 'Editada',
            responses: [
                {
                    title: 'Nuevo titulo',
                    descripcion: 'Nueva descripción',
                    points: 200
                }
            ]
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_FOUND);
    });
    
    test(`When questionId is valid`, async () => {
        const questionCreate = [
            {
                question: '¿Cómo calificas la limpieza?',
                responses: [
                    {
                        title: 'Buena',
                        descripcion: 'El puntaje de una afirmación es 10',
                        points: 10
                    },
                    {
                        title: 'Media',
                        descripcion: 'El puntaje de una afirmación es 6',
                        points: 6
                    },
                    {
                        title: 'Mala',
                        descripcion: 'El puntaje de una afirmación es 1',
                        points: 1
                    }
                ]
            },
            {
                question: '¿Cómo calificas la comida?',
                responses: [
                    {
                        title: 'Buena',
                        descripcion: 'El puntaje de una afirmación es 10',
                        points: 10
                    },
                    {
                        title: 'Mala',
                        descripcion: 'El puntaje de una afirmación es 1',
                        points: 1
                    }
                ]
            },
            {
                question: '¿Cómo calificas el servicio?',
                responses: [
                    {
                        title: 'Buena',
                        descripcion: 'El puntaje de una afirmación es 10',
                        points: 10
                    },
                    {
                        title: 'Media',
                        descripcion: 'El puntaje de una afirmación es 6',
                        points: 6
                    }
                ]
            },
            {
                question: '¿Cómo calificas el internet?',
                responses: [
                    {
                        title: 'Buena',
                        descripcion: 'El puntaje de una afirmación es 10',
                        points: 10
                    },
                    {
                        title: 'Media',
                        descripcion: 'El puntaje de una afirmación es 6',
                        points: 6
                    },
                    {
                        title: 'Mala',
                        descripcion: 'El puntaje de una afirmación es 1',
                        points: 1
                    }
                ]
            },
            {
                question: '¿Cómo calificas la lavadora?',
                responses: [
                    {
                        title: 'Buena',
                        descripcion: 'El puntaje de una afirmación es 10',
                        points: 10
                    },
                    {
                        title: 'Media',
                        descripcion: 'El puntaje de una afirmación es 6',
                        points: 6
                    },
                    {
                        title: 'Mala',
                        descripcion: 'El puntaje de una afirmación es 1',
                        points: 1
                    }
                ]
            }
        ];
        const dataInquiry = {
            name: 'Encuesta Test',
            questions: questionCreate
        };
        const createInquiry = await server.post('/inquirys/').send(dataInquiry).set(Authorization);
        const { id: idInquiry } = createInquiry.body.data;
        const getInquiry = await server.get(`/inquirys/${idInquiry}`).send(dataInquiry).set(Authorization);
        const idQuestion = getInquiry.body.data.questions[0].id;
        const data = {
            question: 'Actualizada',
            responses: [
                {
                    title: 'Nuevo titulo',
                    descripcion: 'Nueva descripción',
                    points: 200
                }
            ]
        };
        const res = await server[typeAPI](`${urlAPI}${idQuestion}`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
});