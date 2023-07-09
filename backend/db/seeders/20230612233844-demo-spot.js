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
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 150.5
        }, {
            ownerId: 1,
            address: '89 Sedgemore Lane',
            city: 'Coventry',
            state: 'Midlands',
            country: 'United Kingdom of Great Britian',
            lat: 60.012,
            lng: 123.678,
            name: 'Buckingham Palace',
            description: 'Palacial estate',
            price: 300.0
        },{
            ownerId: 3,
            address: '543 Munjoy Hill',
            city: 'Portland',
            state: 'Maine',
            country: 'United States of America',
            lat: 79.789,
            lng: 100.345,
            name: 'Oceanview Luxury Apartment',
            description: 'Great apartment with all utilities included. Brand-new kitchen, two bedroom, and small yard with grill',
            price: 80
        },{
            ownerId: 3,
            address: '15 Winter Street',
            city: 'Waterville',
            state: 'Maine',
            country: 'United States of America',
            lat: 50.504,
            lng: 122.345,
            name: 'Winter',
            description: 'Beautifully run-down 5 bedroom house. Mice infestation, no hot water, and decades-old applicances.',
            price: 325.99
        }
    ], {})
    },

    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Spots';
        return queryInterface.bulkDelete(options)
    }
};