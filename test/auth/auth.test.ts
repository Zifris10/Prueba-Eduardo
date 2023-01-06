import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
import { STATUS_OK, STATUS_BAD_REQUEST, STATUS_NOT_ACCEPTABLE, STATUS_NOT_FOUND, STATUS_UNAUTHORIZED, HOST_TESTING } from '../../src/helpers';
const server = request(HOST_TESTING);

describe('POST /auth/admins', () => {
    const urlAPI = '/auth/admins';
    const typeAPI = 'post';
    
    test(`When we don't send information`, async () => {
        const res = await server[typeAPI](urlAPI);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
  
    test(`When email is undefined`, async () => {
        const data = {
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When email is number`, async () => {
        const data = {
            email: 123,
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When email is json`, async () => {
        const data = {
            email: {},
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When email is null`, async () => {
        const data = {
            email: null,
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When email is array`, async () => {
        const data = {
            email: [123],
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
  
    test(`When email is empty`, async () => {
        const data = {
            email: '',
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });
  
    test(`When email is not valid`, async () => {
        const data = {
            email: 'Eduardo',
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });
  
    test(`When password is undefined`, async () => {
        const data = {
            email: 'Eduardo'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When password is number`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: 123
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When password is json`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: {}
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When password is null`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: null
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When password is array`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: [123]
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
  
    test(`When password is empty`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });
  
    test(`When password has empty spaces`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: 'hola hola'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });
  
    test(`When email and password are correct, but user is deleted`, async () => {
        const data = {
            email: 'eduardoborrado@gmail.com',
            password: 'hola123'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_FOUND);
    });
  
    test(`When email is correct, but password is incorrect`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: 'hola1232sded'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_UNAUTHORIZED);
    });
  
    test(`When email and password are correct, but user is not admin`, async () => {
        const data = {
            email: 'eduardosolousuario@gmail.com',
            password: 'hola123'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_FOUND);
    });

    test(`When email and password are correct`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: 'hola123'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_OK);
    });
});

describe('POST /auth/users', () => {
    const urlAPI = '/auth/users';
    const typeAPI = 'post';
    
    test(`When we don't send information`, async () => {
        const res = await server[typeAPI](urlAPI);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
  
    test(`When email is undefined`, async () => {
        const data = {
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When email is number`, async () => {
        const data = {
            email: 123,
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When email is json`, async () => {
        const data = {
            email: {},
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When email is null`, async () => {
        const data = {
            email: null,
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When email is array`, async () => {
        const data = {
            email: [123],
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
  
    test(`When email is empty`, async () => {
        const data = {
            email: '',
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });
  
    test(`When email is not valid`, async () => {
        const data = {
            email: 'Eduardo',
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });
  
    test(`When password is undefined`, async () => {
        const data = {
            email: 'Eduardo'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });

    test(`When password is number`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: 123
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When password is json`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: {}
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When password is null`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: null
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });

    test(`When password is array`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: [123]
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_BAD_REQUEST);
    });
  
    test(`When password is empty`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: ''
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });
  
    test(`When password has empty spaces`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: 'hola hola'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_ACCEPTABLE);
    });
  
    test(`When email and password are correct, but user is deleted`, async () => {
        const data = {
            email: 'eduardoborrado@gmail.com',
            password: 'hola123'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_NOT_FOUND);
    });
  
    test(`When email is correct, but password is incorrect`, async () => {
        const data = {
            email: 'eduardom362@gmail.com',
            password: 'hola1232sded'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_UNAUTHORIZED);
    });

    test(`When email and password are correct`, async () => {
        const data = {
            email: 'eduardosolousuario@gmail.com',
            password: 'hola123'
        };
        const res = await server[typeAPI](urlAPI).send(data);
        expect(res.status).toBe(STATUS_OK);
    });
});