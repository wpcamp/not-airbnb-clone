'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'ReviewImages';
        const reviewImgData = [{
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
        ]
        return queryInterface.bulkInsert(options, reviewImgData)
    },

    down: async(queryInterface, Sequelize) => {
        options.tableName = 'ReviewImages'
        return queryInterface.bulkDelete(options)
    }
};