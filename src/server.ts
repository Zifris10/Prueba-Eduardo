import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { openapiSpecification } from './config';
import { mainRouter } from './routes/routes';

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', '../emails');
app.set('view engine', 'pug');
app.use('/api/v1', mainRouter);
app.use('/api/v1/documentation', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));