'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('users', {
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
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(150),
                allowNull: false
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
        await queryInterface.dropTable('users');
    }
};