'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'SpotImages'
        return queryInterface.bulkInsert(options, [{
                spotId: 1,
                url: 'dartmouth.edu/spot1/image',
                preview: true
            },
            {
                spotId: 2,
                url: 'google.com/spot2/image',
                preview: false
            },
            {
                spotId: 3,
                url: 'instagram.com/spot3/image',
                preview: true
            }
        ], {})
    },
    down: async(queryInterface, Sequelize) => {
        options.tableName = 'SpotImages'
        return queryInterface.bulkDelete(options)
    }
};