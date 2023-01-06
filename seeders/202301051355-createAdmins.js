'use strict';
const data = require('./data/202301051355-createAdmins.json');

module.exports = {
    async up (queryInterface) {
        await queryInterface.bulkInsert('admins', data);
    },
    async down (queryInterface) {
        await queryInterface.bulkDelete('admins', data);
    }
};