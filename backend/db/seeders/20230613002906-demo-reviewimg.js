'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'ReviewImages';
        return queryInterface.bulkInsert(options, [{
                reviewId: 1,
                url: 'google.com/image1',
            },
            {
                reviewId: 2,
                url: 'instagram.com/image2',
            }, {
                reviewId: 3,
                url: 'pinterest.com/image3',
            }
        ], {})
    },
    down: async(queryInterface, Sequelize) => {
        options.tableName = 'ReviewImages'
        return queryInterface.bulkDelete(options)
    }
};