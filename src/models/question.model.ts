import { ModelDefined, DataTypes, Optional } from 'sequelize';
import { sequelizeConnection } from '../config';
import { QuestionsInterface } from '../interfaces';

type OptionalAttributes = Optional<QuestionsInterface, 'createdAt' | 'updatedAt'>;

export const Questions: ModelDefined<
    QuestionsInterface,
    OptionalAttributes
> = sequelizeConnection.define('questions', {
    id: {
        type: DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    question: {
        type: new DataTypes.STRING(100),
        allowNull: false
    },
    inquiryId: {
        type: new DataTypes.STRING(15),
        allowNull: false
    },
    responses: {
        type: new DataTypes.TEXT,
        allowNull: false,
        set(value) {
            const parseText = JSON.stringify(value);
            this.setDataValue('responses', parseText);
        },
        get() {
            const parseJson = this.getDataValue('responses');
            return parseJson ? JSON.parse(parseJson) : null;
        }
    }
});