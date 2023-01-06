'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('questions', {
            id: {
                type: DataTypes.STRING(15),
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            question: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            inquiryId: {
                type: DataTypes.STRING(15),
                allowNull: false,
                references: {
                    model: {
                        tableName: 'inquiry'
                    },
                    key: 'id'
                }
            },
            responses: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.fn('now')
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.fn('now')
            }
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('questions');
    }
};