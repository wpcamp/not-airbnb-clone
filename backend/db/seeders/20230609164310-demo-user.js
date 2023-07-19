'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'Users';

        return queryInterface.bulkInsert(options, [{
                firstName: 'Heung-Min',
                lastName: 'Son',
                email: 'demo@user.io',
                username: 'Demo-lition',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                firstName: 'John',
                lastName: 'Smith',
                email: 'user1@user.io',
                username: 'FakeUser1',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'user2@user.io',
                username: 'FakeUser2',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                firstName: 'Harry',
                lastName: 'Kane',
                email: 'user3@user.io',
                username: 'HarryKane',
                hashedPassword: bcrypt.hashSync('password')
            }
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Users';
        return queryInterface.bulkDelete(options);
    }
};