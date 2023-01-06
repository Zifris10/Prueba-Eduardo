import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
import { STATUS_OK, STATUS_NOT_FOUND, STATUS_BAD_REQUEST, STATUS_NOT_ACCEPTABLE, HOST_TESTING } from '../../src/helpers';
const server = request(HOST_TESTING);
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
let idInquiry: string;
let token: string;

beforeAll(async () => {
    const dataInquiry = {
        name: 'Encuesta Test',
        questions: questionCreate
    };
    const dataAuth = {
        email: 'eduardom362@gmail.com',
        password: 'hola123'
    };
    const res = await server.post('/auth/admins').send(dataAuth);
    token = res.body.data;
    const createInquiry = await server.post('/inquirys/').send(dataInquiry).set({ authorization: token });
    idInquiry = createInquiry.body.data.id;
});

describe('GET /inquirys/', () => {
    const urlAPI = '/inquirys/';
    const typeAPI = 'get';
    let Authorization = {
        authorization: ''
    };

    beforeAll(() => {
        Authorization.authorization = token;
    });
    
    test(`When the limit parameter is undefined`, async () => {
        const params = `?offset=0`;
        const res = await server[typeAPI](`${urlAPI}${params}`).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
    
    test(`When the limit parameter is not valid`, async () => {
        const params = `?limit=true&offset=0`;
        const res = await server[typeAPI](`${urlAPI}${params}`).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
    
    test(`When the offset parameter is undefined`, async () => {
        const params = `?limit=20`;
        const res = await server[typeAPI](`${urlAPI}${params}`).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
    
    test(`When the offset parameter is not valid`, async () => {
        const params = `?limit=20&offset=hola`;
        const res = await server[typeAPI](`${urlAPI}${params}`).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
    
    test(`When all params are undefined`, async () => {
        const res = await server[typeAPI](`${urlAPI}`).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
    
    test(`When all params are valid`, async () => {
        const params = `?limit=20&offset=0`;
        const res = await server[typeAPI](`${urlAPI}${params}`).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
});

describe('GET /inquirys/:inquiryId', () => {
    const urlAPI = '/inquirys/';
    const typeAPI = 'get';
    let Authorization = {
        authorization: ''
    };

    beforeAll(() => {
        Authorization.authorization = token;
    });
    
    test(`When inquiryId not found`, async () => {
        const res = await server[typeAPI](`${urlAPI}shortid`).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_FOUND);
    });
    
    test(`When inquiryId is valid`, async () => {
        const res = await server[typeAPI](`${urlAPI}${idInquiry}`).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
});

describe('DELETE /inquirys/:inquiryId', () => {
    const urlAPI = '/inquirys/';
    const typeAPI = 'delete';
    let Authorization = {
        authorization: ''
    };

    beforeAll(() => {
        Authorization.authorization = token;
    });
    
    test(`When inquiryId not found`, async () => {
        const res = await server[typeAPI](`${urlAPI}shortid`).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_FOUND);
    });
    
    test(`When inquiryId is valid`, async () => {
        const res = await server[typeAPI](`${urlAPI}${idInquiry}`).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
});

describe('PUT /inquirys/:inquiryId', () => {
    const urlAPI = '/inquirys/';
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
  
    test(`When name is undefined`, async () => {
        const data = {};
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When name is number`, async () => {
        const data = {
            name: 123
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When name is json`, async () => {
        const data = {
            name: {}
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When name is null`, async () => {
        const data = {
            name: null
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When name is array`, async () => {
        const data = {
            name: [123]
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
  
    test(`When name is empty`, async () => {
        const data = {
            name: ''
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });
    
    test(`When inquiryId not found`, async () => {
        const data = {
            name: 'Actualizada'
        };
        const res = await server[typeAPI](`${urlAPI}shortid`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_FOUND);
    });
    
    test(`When inquiryId is valid`, async () => {
        const data = {
            name: 'Actualizada'
        };
        const res = await server[typeAPI](`${urlAPI}${idInquiry}`).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
});

describe('POST /inquirys/', () => {
    const urlAPI = '/inquirys/';
    const typeAPI = 'post';
    let Authorization = {
        authorization: ''
    };

    beforeAll(() => {
        Authorization.authorization = token;
    });

    test(`When we don't send information`, async () => {
        const res = await server[typeAPI](urlAPI).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST)
    });
  
    test(`When name is undefined`, async () => {
        const data = {};
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When name is number`, async () => {
        const data = {
            name: 123
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When name is json`, async () => {
        const data = {
            name: {}
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When name is null`, async () => {
        const data = {
            name: null
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When name is array`, async () => {
        const data = {
            name: [123]
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
  
    test(`When name is empty`, async () => {
        const data = {
            name: ''
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When questions is undefined`, async () => {
        const data = {
            name: 'Nueva Encuesta De Prueba'
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When questions is number`, async () => {
        const data = {
            name: 'Nueva Encuesta De Prueba',
            questions: 123
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When questions is json`, async () => {
        const data = {
            name: 'Nueva Encuesta De Prueba',
            questions: {}
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When questions is null`, async () => {
        const data = {
            name: 'Nueva Encuesta De Prueba',
            questions: null
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When questions is empty array`, async () => {
        const data = {
            name: 'Nueva Encuesta De Prueba',
            questions: []
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When questions is array with 3 positions`, async () => {
        const data = {
            name: 'Nueva Encuesta De Prueba',
            questions: [123, 123, '123']
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When questions is array with 6 positions`, async () => {
        const data = {
            name: 'Nueva Encuesta De Prueba',
            questions: [123, 123, '123', 123, 123, '123']
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When questions is array with 5 positions, but is not valid`, async () => {
        const data = {
            name: 'Nueva Encuesta De Prueba',
            questions: [123, 123, '123', 123, 123]
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When all info is correct`, async () => {
        const data = {
            name: 'Nueva Encuesta De Prueba',
            questions: questionCreate
        };
        const res = await server[typeAPI](urlAPI).send(data).set(Authorization);
        expect(res.status).toBe(STATUS_OK);
    });
});