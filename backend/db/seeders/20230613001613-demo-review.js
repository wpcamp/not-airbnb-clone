'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'Reviews';
        return queryInterface.bulkInsert(options, [{
                spotId: 1,
                userId: 1,
                review: 'Good gym, nice squash courts',
                stars: 3
            }, {
                spotId: 1,
                userId: 2,
                review: 'Very tired interior',
                stars: 2
            },
            {
                spotId: 2,
                userId: 3,
                review: 'Love the food!',
                stars: 5
            }, {
                spotId: 2,
                userId: 2,
                review: 'Bad restaurant 0/10 rating',
                stars: 0
            }, {
                spotId: 3,
                userId: 3,
                review: 'Beautiful home',
                stars: 5
            }, {
                spotId: 3,
                userId: 2,
                review: 'Love it',
                stars: 4
            }
        ], {})
    },
    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Reviews';
        return queryInterface.bulkDelete(options)
    }
};