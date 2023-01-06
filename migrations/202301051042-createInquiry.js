'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('inquiry', {
            id: {
                type: DataTypes.STRING(15),
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            createdBy: {
                type: DataTypes.STRING(15),
                allowNull: false,
                references: {
                    model: {
                        tableName: 'users'
                    },
                    key: 'id'
                }
            },
            deleted: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            deletedBy: {
                type: DataTypes.STRING(15),
                allowNull: true,
                references: {
                    model: {
                        tableName: 'users'
                    },
                    key: 'id'
                }
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
        await queryInterface.dropTable('inquiry');
    }
};