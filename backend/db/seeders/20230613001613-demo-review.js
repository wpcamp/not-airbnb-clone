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
                userId: 2,
                review: 'Quaint and quiet neighborhood, a lovely spot for a weekend retreat.',
                stars: 4.5
            }, {
                spotId: 1,
                userId: 3,
                review: 'Great location, walking distance to attractions and dining. Comfortable beds and well-equipped kitchen.',
                stars: 5
            },
            {
                spotId: 1,
                userId: 4,
                review: 'Disappointing stay. The apartment was poorly maintained, with broken fixtures and dirty linens.',
                stars: 1
            }, {
                spotId: 2,
                userId: 1,
                review: 'Terrible condition - leaks, creaky floors, and a foul smell made it unbearable. Would give zero stars if I could!',
                stars: 1
            }, {
                spotId: 2,
                userId: 3,
                review: 'The vintage decor added a unique touch, making this apartment stand out from the rest.',
                stars: 4
            }, {
                spotId: 2,
                userId: 4,
                review: 'Uncomfortable bed and noisy neighbors kept us up all night.',
                stars: 2
            }, {
                spotId: 3,
                userId: 2,
                review: 'An oasis in the city! The private garden and luxurious amenities made our stay unforgettable.',
                stars: 5
            }, {
                spotId: 3,
                userId: 3,
                review: 'Quaint and quiet neighborhood, a lovely spot for a weekend retreat.',
                stars: 4
            }, {
                spotId: 3,
                userId: 4,
                review: 'Impeccably clean and beautifully decorated, this charming cottage felt like home away from home.',
                stars: 5
            }, {
                spotId: 4,
                userId: 1,
                review: 'Average stay, nothing spectacular but nothing terrible either.',
                stars: 3
            }, {
                spotId: 4,
                userId: 2,
                review: 'Check-in process could have been smoother, but overall, a nice experience.',
                stars: 4
            }, {
                spotId: 4,
                userId: 4,
                review: 'Shady neighborhood, broken windows, and an overall hazardous environment.',
                stars: 1
            }, {
                spotId: 5,
                userId: 1,
                review: 'Stay away! We had to wait for hours to get the keys and the place was nothing like the photos.',
                stars: 1
            }, {
                spotId: 5,
                userId: 2,
                review: 'Do not recommend. The location was sketchy, and we felt unsafe throughout our stay.',
                stars: 1
            }, {
                spotId: 5,
                userId: 3,
                review: 'The perfect getaway for nature lovers! Serene surroundings and a crackling fireplace made for a magical stay.',
                stars: 5
            }, {
                spotId: 6,
                userId: 1,
                review: 'Decent amenities, but the location was a bit far from city attractions.',
                stars: 3
            }, {
                spotId: 6,
                userId: 2,
                review: 'Good value for money, a great spot for budget travelers looking for a convenient stay.',
                stars: 5
            }, {
                spotId: 6,
                userId: 3,
                review: 'Absolutely stunning views from the balcony, this chic penthouse exceeded all expectations.',
                stars: 5
            }
        ], {})
    },
    down: async(queryInterface, Sequelize) => {
        options.tableName = 'Reviews';
        return queryInterface.bulkDelete(options)
    }
};