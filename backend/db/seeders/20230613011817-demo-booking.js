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
            userId: 2,
            startDate: new Date("2022-09-24"),
            endDate: new Date("2022-10-24")
        }, {
            spotId: 1,
            userId: 3,
            startDate: new Date('2023-01-01'),
            endDate: new Date("2023-01-05")
        }, {
            spotId: 2,
            userId: 1,
            startDate: new Date("2023-08-05"),
            endDate: new Date("2023-09-02")
        }, {
            spotId: 2,
            userId: 4,
            startDate: new Date('2023-01-11'),
            endDate: new Date("2023-01-15")
        }, {
            spotId: 3,
            userId: 2,
            startDate: new Date("2022-11-05"),
            endDate: new Date("2022-11-17")
        }, {
            spotId: 3,
            userId: 4,
            startDate: new Date('2023-01-01'),
            endDate: new Date("2023-01-05")
        }, {
            spotId: 4,
            userId: 1,
            startDate: new Date("2022-10-05"),
            endDate: new Date("2022-11-02")
        }, {
            spotId: 4,
            userId: 2,
            startDate: new Date('2023-01-01'),
            endDate: new Date("2023-01-05")
        }, {
            spotId: 5,
            userId: 1,
            startDate: new Date("2024-08-05"),
            endDate: new Date("2024-09-02")
        }, {
            spotId: 5,
            userId: 3,
            startDate: new Date('2024-01-11'),
            endDate: new Date("2024-01-21")
        }, {
            spotId: 6,
            userId: 2,
            startDate: new Date("2022-11-05"),
            endDate: new Date("2024-01-02")
        }], {})
    },
    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Bookings'
        return queryInterface.bulkDelete(options)
    }
};