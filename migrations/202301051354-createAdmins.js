'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('admins', {
            id: {
                type: DataTypes.STRING(15),
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            userId: {
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
        await queryInterface.dropTable('admins');
    }
};