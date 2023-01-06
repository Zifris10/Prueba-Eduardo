import { ModelDefined, DataTypes, Optional } from 'sequelize';
import { sequelizeConnection } from '../config';
import { UserInterface } from '../interfaces';

type OptionalAttributes = Optional<UserInterface, 'createdAt' | 'updatedAt' | 'deleted'>;

export const Users: ModelDefined<
  UserInterface,
  OptionalAttributes
> = sequelizeConnection.define('users', {
    id: {
        type: DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: new DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: new DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: new DataTypes.STRING(150),
        allowNull: false
    },
    deleted: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});