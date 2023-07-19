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
            address: '123 Cedar Street',
            city: 'Hanover',
            state: 'New Hampshire',
            country: 'United States of America',
            lat: -55.456,
            lng: -167.012,
            name: 'Dartmouth Alumni Gym',
            description: 'Welcome to The Dartmouth Alumni Gym Apartments, where history meets modern luxury. Once a bustling college gym, this exclusive residence now offers elegantly designed apartments with state-of-the-art amenities. Embrace the charm of exposed brick walls and high ceilings, while enjoying the convenience of a fully equipped fitness center and rooftop pool.',
            price: 450.00
        }, {
            ownerId: 2,
            address: '432 Elm Street',
            city: 'Norwich',
            state: 'Vermont',
            country: 'United States of America',
            lat: 77.789,
            lng: 112.345,
            name: 'Carpenter and Main',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 175.00
        }, {
            ownerId: 1,
            address: '89 Sedgemore Lane',
            city: 'London',
            state: 'Texas',
            country: 'United States of America',
            lat: 60.012,
            lng: 123.678,
            name: '1:1 Copy of Buckingham Palace',
            description: 'Experience the epitome of British grandeur in the heart of Texas. Immerse yourself in opulent State Rooms, breathtaking gardens, and historic charm. A unique opportunity to live like royalty, surrounded by centuries of majestic history and iconic landmarks.',
            price: 4500.00
        },{
            ownerId: 3,
            address: '543 Munjoy Hill',
            city: 'Portland',
            state: 'Maine',
            country: 'United States of America',
            lat: 79.789,
            lng: 100.345,
            name: 'Oceanview Luxury Apartment',
            description: 'Great apartment with all utilities included. Brand-new kitchen, two bedroom, and small yard with grill. Greate neighborhood, with a fire station nearby in case of any accidents!',
            price: 299.99
        },{
            ownerId: 4,
            address: '15 Winter Street',
            city: 'Waterville',
            state: 'Maine',
            country: 'United States of America',
            lat: 50.504,
            lng: 122.345,
            name: 'Winter',
            description: 'Beautifully run-down 5 bedroom house with a one car garage in the heart of Waterville, Maine. This old mill dormitory has seen little renovation since it was built in the mid-to-late 1800s. Mouse infestation, no hot water, and decades-old applicances. Completely unfinished basement.',
            price: 100.00
        },
        {
            ownerId: 4,
            address: '1 Wood Street',
            city: 'Rhinebeck',
            state: 'New York',
            country: 'United States of America',
            lat: 70.504,
            lng: 120.335,
            name: 'Architectural wonder in the woods',
            description: 'Unique experience, secluded. Enjoy a weekend or a few days eco-friendly retreat in an architectural, geometric masterpiece on 30 preserved acres just minutes from all that Rhinebeck and the Hudson Valley have to offer.',
            price: 325.99
        }
    ], {})
    },

    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Spots';
        return queryInterface.bulkDelete(options)
    }
};