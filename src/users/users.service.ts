import { logger, STATUS_OK, STATUS_NOT_FOUND, STATUS_INTERNAL_SERVER_ERROR } from '../helpers';
import { LoggerInterface, GetDataFromDatabaseInterface, StatusResponseInterface } from '../interfaces';
import { Users } from '../models';

export class UsersService {
    public static async findOne(data: GetDataFromDatabaseInterface): Promise<StatusResponseInterface> {
        try {
            let dataSend: StatusResponseInterface = {
                code: STATUS_OK
            };
            const getUser = await Users.findOne(data);
            if(getUser) {
                dataSend.data = getUser.dataValues;
            } else {
                dataSend.code = STATUS_NOT_FOUND;
                dataSend.error = 'Oops, lo sentimos pero no hemos logrado encontrar el usuario.';
            }
            return dataSend;
        } catch (error: any) {
            const dataLog: LoggerInterface = {
                level: 'error',
                message: error.message,
                functionName: 'UsersService.findOne',
                data
            };
            logger.log(dataLog);
            return { code: STATUS_INTERNAL_SERVER_ERROR, error: 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.' };
        }
    }
};