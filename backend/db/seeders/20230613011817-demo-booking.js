'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'Bookings'
        return queryInterface.bulkInsert(options, [{
            spotId: 1,
            userId: 1,
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }, {
            spotId: 2,
            userId: 2,
            startDate: new Date(),
            endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
        }, {
            spotId: 3,
            userId: 1,
            startDate: new Date(),
            endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        }], {})
    },
    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Bookings'
        return queryInterface.bulkDelete(options)
    }
};