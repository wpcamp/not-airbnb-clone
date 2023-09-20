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
                email: 'COYS@user.io',
                username: 'Heung-Min-Son',
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
            },
            {
                firstName: 'Demo',
                lastName: 'Lition',
                email: 'demo@user.io',
                username: 'Demo-lition',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                firstName: 'Eric',
                lastName: 'Andre',
                email: 'eric@user.io',
                username: 'ericAndre',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                firstName: 'John',
                lastName: 'Hamm',
                email: 'johnhamm@user.io',
                username: 'hammJohn',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                firstName: 'Lil',
                lastName: 'Wayne',
                email: 'tunechi@youngmoney.io',
                username: 'youngTune',
                hashedPassword: bcrypt.hashSync('password')
            }
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Users';
        return queryInterface.bulkDelete(options);
    }
};