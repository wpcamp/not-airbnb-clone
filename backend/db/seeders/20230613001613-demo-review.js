'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'Reviews';
        const reviewData = [{
            spotId: 1,
            userId: 1,
            review: 'Good gym, nice squash courts',
            stars: 0
        }, {
            spotId: 2,
            userId: 2,
            review: 'Bad restaurant 0/10 rating',
            stars: 0
        }, {
            spotId: 3,
            userId: 1,
            review: 'Beautiful home',
            stars: 5
        }]
        return queryInterface.bulkInsert(options, reviewData)
    },
    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Reviews';
        return queryInterface.bulkDelete(options)
    }
};