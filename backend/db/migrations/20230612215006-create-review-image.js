'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ReviewImages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            reviewId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                refernces: {
                    model: 'Reviews',
                    key: 'id'
                }
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, options);
    },
    async down(queryInterface, Sequelize) {
        options.tableName = 'ReviewImages'
        return queryInterface.dropTable(options);
    }
};