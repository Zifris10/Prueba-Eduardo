import { Router } from 'express';

import { authRoute } from '../auth/auth.route';
import { inquiryRoute } from '../inquiry/inquiry.route';
import { questionRoute } from '../questions/questions.route';

export const mainRouter: Router = Router();

mainRouter.use('/auth', authRoute);
mainRouter.use('/inquirys', inquiryRoute);
mainRouter.use('/questions', questionRoute);