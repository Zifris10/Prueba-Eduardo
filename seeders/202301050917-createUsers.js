'use strict';
const data = require('./data/202301050917-createUsers.json');

module.exports = {
    async up (queryInterface) {
        await queryInterface.bulkInsert('users', data);
    },
    async down (queryInterface) {
        await queryInterface.bulkDelete('users', data);
    }
};