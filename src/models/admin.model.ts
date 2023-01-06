import { ModelDefined, DataTypes, Optional } from 'sequelize';
import { sequelizeConnection } from '../config';
import { AdminsInterface } from '../interfaces';

type OptionalAttributes = Optional<AdminsInterface, 'createdAt' | 'updatedAt'>;

export const Admins: ModelDefined<
    AdminsInterface,
    OptionalAttributes
> = sequelizeConnection.define('admins', {
    id: {
        type: DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    userId: {
        type: new DataTypes.STRING(15),
        allowNull: false
    },
    deleted: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});