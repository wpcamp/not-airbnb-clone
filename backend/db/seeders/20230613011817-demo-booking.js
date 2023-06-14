'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'Bookings'
        const bookingData = [{
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
        }]
        return queryInterface.bulkInsert(options, bookingData)
    },

    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Bookings'
        return queryInterface.bulkDelete(options)
    }
};