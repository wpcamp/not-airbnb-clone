'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'Spots';
        return queryInterface.bulkInsert(options, [{
            ownerId: 1,
            address: '123 Main Street',
            city: 'Hanover',
            state: 'New Hampshire',
            country: 'United States of America',
            lat: -55.456,
            lng: -167.012,
            name: 'Dartmouth Gym',
            description: 'Place to workout',
            price: 25.00
        }, {
            ownerId: 2,
            address: '123 Elm Street',
            city: 'Norwich',
            state: 'Vermont',
            country: 'United States of America',
            lat: 77.789,
            lng: 112.345,
            name: 'Carpenter and Main',
            description: 'Restaurant with poor food handling practices',
            price: 150.5
        }, {
            ownerId: 1,
            address: '89 Sedgemore Lane',
            city: 'Coventry',
            state: 'Midlands',
            country: 'United Kingdom of Great Britian',
            lat: 60.012,
            lng: 123.678,
            name: 'Ancestral Homeland',
            description: 'Nice home',
            price: 300.0
        }], {})
    },

    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Spots';
        return queryInterface.bulkDelete(options)
    }
};