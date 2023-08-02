'use strict';

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA
}
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('SpotImages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            spotId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Spots',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            url: {
                type: Sequelize.TEXT
            },
            preview: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        }, options);
    },
    async down(queryInterface, Sequelize) {
        options.tableName = 'SpotImages';
        return queryInterface.dropTable(options);
    }
};