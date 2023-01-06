import { ModelDefined, DataTypes, Optional } from 'sequelize';
import { sequelizeConnection } from '../config';
import { InquiryInterface } from '../interfaces';

type OptionalAttributes = Optional<InquiryInterface, 'createdAt' | 'updatedAt' | 'deleted' | 'deletedBy'>;

export const Inquiry: ModelDefined<
    InquiryInterface,
    OptionalAttributes
> = sequelizeConnection.define('inquiry', {
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
    createdBy: {
        type: new DataTypes.STRING(15),
        allowNull: false
    },
    deleted: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    deletedBy: {
        type: new DataTypes.STRING(15),
        allowNull: true
    }
});