'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
    up: async (queryInterface, Sequelize) => {
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
        },
        {
            spotId: 1,
            userId: 2,
            review: "Absolutely loved our stay! The beachfront bungalow was a dream come true. It was clean, well-equipped, and had stunning views. We'll definitely be back!",
            stars: 5
        },
        {
            spotId: 2,
            userId: 4,
            review: "Had a fantastic time in this mountain chalet. The ski slopes were just a short walk away, and the hot tub was perfect for relaxing after a day on the slopes.",
            stars: 4
        },
        {
            spotId: 3,
            userId: 3,
            review: "The lakeside cabin was a peaceful retreat. We enjoyed fishing off the dock and roasting marshmallows by the firepit. Will return for sure!",
            stars: 5
        },
        {
            spotId: 4,
            userId: 7,
            review: "Staying in a treehouse in Big Sur was a unique experience. The redwoods were magical, and the hot tub under the stars was unforgettable. Highly recommend!",
            stars: 5
        },
        {
            spotId: 5,
            userId: 1,
            review: "Sedona's red rock desert is breathtaking, and this villa was the perfect base for our adventures. We loved the pool and the panoramic views!",
            stars: 4
        },
        {
            spotId: 6,
            userId: 6,
            review: "Napa Valley is a wine lover's paradise, and this cottage was a dream. Sipping wine on the vineyard was a highlight. We'll be back for the harvest!",
            stars: 5
        },
        {
            spotId: 7,
            userId: 5,
            review: "Cape Cod's charm was all around us in this seaside retreat. Perfect for long walks on the beach and enjoying fresh seafood. A wonderful escape!",
            stars: 4
        },
        {
            spotId: 8,
            userId: 8,
            review: "The mountain lodge in Breckenridge was spacious and cozy. Skiing right from the doorstep was a plus. The sauna and game room kept us entertained.",
            stars: 4
        },
        {
            spotId: 9,
            userId: 2,
            review: "Scottsdale's desert oasis was a relaxing getaway. The pool was perfect for cooling off, and we loved exploring the art scene in the area.",
            stars: 4
        },
        {
            spotId: 10,
            userId: 3,
            review: "Lake Placid's tranquility was unmatched. Fishing by the cabin was a joy, and the Adirondacks offered great hiking. A peaceful escape!",
            stars: 5
        },
        {
            spotId: 11,
            userId: 5,
            review: "Destin's beachfront villa was paradise. Waking up to Gulf views was amazing, and the private pool was the icing on the cake. Highly recommended!",
            stars: 5
        },
        {
            spotId: 12,
            userId: 7,
            review: "The Rocky Mountain cabin in Estes Park was a cozy hideaway. Hiking in the national park was a highlight, and the hot tub was perfect for stargazing.",
            stars: 4
        },
        {
            spotId: 13,
            userId: 6,
            review: "Charleston's coastal cottage was full of Southern charm. We loved the historic sites and delicious seafood. The porch swing was a favorite spot.",
            stars: 5
        },
        {
            spotId: 14,
            userId: 8,
            review: "Lake Geneva's lakefront manor was pure luxury. Water sports and exquisite dining made our stay unforgettable. Can't wait to return!",
            stars: 5
        },
        {
            spotId: 15,
            userId: 1,
            review: "Palm Springs' desert rose villa was a stylish oasis. Poolside relaxation and exploring art galleries made for a memorable vacation.",
            stars: 4
        },
        {
            spotId: 16,
            userId: 4,
            review: "Telluride's mountain chalet was perfect for adventure. Skiing and hot tub relaxation were highlights. We'll be back for more!",
            stars: 4
        },
        {
            spotId: 17,
            userId: 3,
            review: "Monterey's coastal haven was a dream come true. Watching whales from the deck was incredible, and the local seafood was mouthwatering.",
            stars: 5
        },
        {
            spotId: 18,
            userId: 6,
            review: "Lake Norman's lakefront paradise cabin was a peaceful retreat. Fishing and boating were perfect. Sunset views from the porch were stunning.",
            stars: 5
        },
        {
            spotId: 19,
            userId: 2,
            review: "Sonoma's wine country cottage was a romantic escape. Exploring vineyards and savoring fine wines made for a delightful getaway.",
            stars: 5
        },
        {
            spotId: 20,
            userId: 7,
            review: "The beachfront bungalow was lovely. The view was amazing, and the location was great. I'd definitely stay here again!",
            stars: 4
        },
        {
            spotId: 21,
            userId: 5,
            review: "We had a fantastic time in the mountain chalet. The skiing was incredible, and the hot tub was a great way to relax after a long day on the slopes.",
            stars: 4
        },
        {
            spotId: 22,
            userId: 3,
            review: "The lakeside cabin was a serene escape. We enjoyed the tranquility by the lake and made great memories by the firepit. Highly recommended!",
            stars: 5
        },
        {
            spotId: 23,
            userId: 8,
            review: "Staying in the treehouse was a childhood dream come true. The redwoods were enchanting, and the hot tub was perfect for stargazing.",
            stars: 5
        },
        {
            spotId: 24,
            userId: 6,
            review: "The villa in Sedona was a desert paradise. We loved the stunning views, and the pool was perfect for cooling off in the Arizona heat.",
            stars: 4
        },
        {
            spotId: 25,
            userId: 1,
            review: "Napa Valley's charm was all around us in the cottage. Sipping wine on the vineyard was a dream come true. We'll definitely return!",
            stars: 5
        },
        {
            spotId: 1,
            userId: 3,
            review: "Cape Cod's seaside retreat was a perfect escape. The sandy beaches and fresh seafood made it a memorable vacation.",
            stars: 4
        },
        {
            spotId: 2,
            userId: 2,
            review: "The mountain lodge in Breckenridge was spacious and cozy. Skiing right from the doorstep was fantastic, and the sauna was a great bonus.",
            stars: 4
        },
        {
            spotId: 3,
            userId: 4,
            review: "Scottsdale's desert oasis was a relaxing getaway. We loved the pool, and exploring nearby golf courses was a blast.",
            stars: 4
        },
        {
            spotId: 4,
            userId: 1,
            review: "The cozy lakeside cabin in Lake Placid was perfect for a quiet retreat. Fishing by the dock and hiking in the Adirondacks were highlights.",
            stars: 5
        },
        {
            spotId: 5,
            userId: 7,
            review: "The beachfront villa in Destin was paradise on Earth. Waking up to the sound of waves and the private pool made it a dream vacation.",
            stars: 5
        },
        {
            spotId: 6,
            userId: 8,
            review: "The Rocky Mountain cabin in Estes Park was a charming hideaway. Hiking in the national park and stargazing from the hot tub were unforgettable.",
            stars: 4
        },
        {
            spotId: 7,
            userId: 5,
            review: "Charleston's coastal cottage was full of Southern charm. Exploring historic sites and dining on delicious seafood were highlights.",
            stars: 5
        },
        {
            spotId: 8,
            userId: 3,
            review: "Lake Geneva's lakefront manor was pure luxury. Water sports and gourmet dining made our stay truly special. Can't wait to come back!",
            stars: 5
        },
        {
            spotId: 9,
            userId: 2,
            review: "Palm Springs' desert rose villa was an oasis of style. Poolside relaxation and art gallery hopping made it a memorable trip.",
            stars: 4
        },
        {
            spotId: 10,
            userId: 6,
            review: "Telluride's mountain chalet was perfect for adventure. Skiing and hot tub relaxation were highlights. We'll be back for more!",
            stars: 4
        },
        {
            spotId: 11,
            userId: 7,
            review: "Monterey's coastal haven was a dream come true. Watching whales from the deck was an unforgettable experience, and the seafood was divine.",
            stars: 5
        },
        {
            spotId: 12,
            userId: 4,
            review: "Lake Norman's lakefront paradise cabin was a peaceful retreat. Fishing and boating were perfect. Sunset views from the porch were stunning.",
            stars: 5
        },
        {
            spotId: 13,
            userId: 1,
            review: "Sonoma's wine country cottage was a romantic escape. Exploring vineyards and savoring fine wines made for a delightful getaway.",
            stars: 5
        },
        {
            spotId: 14,
            userId: 8,
            review: "The beachfront bungalow was lovely. The view was amazing, and the location was great. I'd definitely stay here again!",
            stars: 4
        },
        {
            spotId: 15,
            userId: 5,
            review: "We had a fantastic time in the mountain chalet. The skiing was incredible, and the hot tub was a great way to relax after a long day on the slopes.",
            stars: 4
        },
        {
            spotId: 16,
            userId: 3,
            review: "The lakeside cabin was a serene escape. We enjoyed the tranquility by the lake and made great memories by the firepit. Highly recommended!",
            stars: 5
        },
        {
            spotId: 17,
            userId: 2,
            review: "Staying in the treehouse was a childhood dream come true. The redwoods were enchanting, and the hot tub was perfect for stargazing.",
            stars: 5
        },
        {
            spotId: 18,
            userId: 6,
            review: "The villa in Sedona was a desert paradise. We loved the stunning views, and the pool was perfect for cooling off in the Arizona heat.",
            stars: 4
        },
        {
            spotId: 19,
            userId: 7,
            review: "Napa Valley's charm was all around us in the cottage. Sipping wine on the vineyard was a dream come true. We'll definitely return!",
            stars: 5
        },
        {
            spotId: 20,
            userId: 8,
            review: "Cape Cod's seaside retreat was a perfect escape. The sandy beaches and fresh seafood made it a memorable vacation.",
            stars: 4
        },
        {
            spotId: 21,
            userId: 1,
            review: "The mountain lodge in Breckenridge was spacious and cozy. Skiing right from the doorstep was fantastic, and the sauna was a great bonus.",
            stars: 4
        },
        {
            spotId: 22,
            userId: 4,
            review: "Scottsdale's desert oasis was a relaxing getaway. We loved the pool, and exploring nearby golf courses was a blast.",
            stars: 4
        },
        {
            spotId: 23,
            userId: 5,
            review: "The cozy lakeside cabin in Lake Placid was perfect for a quiet retreat. Fishing by the dock and hiking in the Adirondacks were highlights.",
            stars: 5
        },
        {
            spotId: 24,
            userId: 6,
            review: "The beachfront villa in Destin was paradise on Earth. Waking up to the sound of waves and the private pool made it a dream vacation.",
            stars: 5
        },
        {
            spotId: 25,
            userId: 7,
            review: "The Rocky Mountain cabin in Estes Park was a charming hideaway. Hiking in the national park and stargazing from the hot tub were unforgettable.",
            stars: 4
        },
        {
            spotId: 1,
            userId: 2,
            review: "Charleston's coastal cottage was full of Southern charm. Exploring historic sites and dining on delicious seafood were highlights.",
            stars: 5
        },
        {
            spotId: 2,
            userId: 3,
            review: "Lake Geneva's lakefront manor was pure luxury. Water sports and gourmet dining made our stay truly special. Can't wait to come back!",
            stars: 5
        },
        {
            spotId: 3,
            userId: 4,
            review: "Palm Springs' desert rose villa was an oasis of style. Poolside relaxation and art gallery hopping made it a memorable trip.",
            stars: 4
        },
        {
            spotId: 4,
            userId: 5,
            review: "Telluride's mountain chalet was perfect for adventure. Skiing and hot tub relaxation were highlights. We'll be back for more!",
            stars: 4
        },
        {
            spotId: 5,
            userId: 6,
            review: "Monterey's coastal haven was a dream come true. Watching whales from the deck was an unforgettable experience, and the seafood was divine.",
            stars: 5
        },
        {
            spotId: 6,
            userId: 7,
            review: "Lake Norman's lakefront paradise cabin was a peaceful retreat. Fishing and boating were perfect. Sunset views from the porch were stunning.",
            stars: 5
        },
        {
            spotId: 7,
            userId: 8,
            review: "Sonoma's wine country cottage was a romantic escape. Exploring vineyards and savoring fine wines made for a delightful getaway.",
            stars: 5
        },
        {
            spotId: 8,
            userId: 1,
            review: "The beachfront bungalow was lovely. The view was amazing, and the location was great. I'd definitely stay here again!",
            stars: 4
        },
        {
            spotId: 9,
            userId: 2,
            review: "We had a fantastic time in the mountain chalet. The skiing was incredible, and the hot tub was a great way to relax after a long day on the slopes.",
            stars: 4
        },
        {
            spotId: 10,
            userId: 3,
            review: "The lakeside cabin was a serene escape. We enjoyed the tranquility by the lake and made great memories by the firepit. Highly recommended!",
            stars: 5
        },
        {
            spotId: 11,
            userId: 4,
            review: "Staying in the treehouse was a childhood dream come true. The redwoods were enchanting, and the hot tub was perfect for stargazing.",
            stars: 5
        },
        {
            spotId: 12,
            userId: 5,
            review: "The villa in Sedona was a desert paradise. We loved the stunning views, and the pool was perfect for cooling off in the Arizona heat.",
            stars: 4
        },
        {
            spotId: 13,
            userId: 6,
            review: "Napa Valley's charm was all around us in the cottage. Sipping wine on the vineyard was a dream come true. We'll definitely return!",
            stars: 5
        },
        {
            spotId: 14,
            userId: 7,
            review: "Cape Cod's seaside retreat was a perfect escape. The sandy beaches and fresh seafood made it a memorable vacation.",
            stars: 4
        },
        {
            spotId: 15,
            userId: 8,
            review: "The mountain lodge in Breckenridge was spacious and cozy. Skiing right from the doorstep was fantastic, and the sauna was a great bonus.",
            stars: 4
        },
        {
            spotId: 16,
            userId: 1,
            review: "Scottsdale's desert oasis was a relaxing getaway. We loved the pool, and exploring nearby golf courses was a blast.",
            stars: 4
        },
        {
            spotId: 17,
            userId: 2,
            review: "The cozy lakeside cabin in Lake Placid was perfect for a quiet retreat. Fishing by the dock and hiking in the Adirondacks were highlights.",
            stars: 5
        },
        {
            spotId: 18,
            userId: 3,
            review: "The beachfront villa in Destin was paradise on Earth. Waking up to the sound of waves and the private pool made it a dream vacation.",
            stars: 5
        },
        {
            spotId: 19,
            userId: 4,
            review: "The Rocky Mountain cabin in Estes Park was a charming hideaway. Hiking in the national park and stargazing from the hot tub were unforgettable.",
            stars: 4
        },
        {
            spotId: 20,
            userId: 5,
            review: "Charleston's coastal cottage was full of Southern charm. Exploring historic sites and dining on delicious seafood were highlights.",
            stars: 5
        },
        {
            spotId: 21,
            userId: 6,
            review: "Lake Geneva's lakefront manor was pure luxury. Water sports and gourmet dining made our stay truly special. Can't wait to come back!",
            stars: 5
        },
        {
            spotId: 22,
            userId: 7,
            review: "Palm Springs' desert rose villa was an oasis of style. Poolside relaxation and art gallery hopping made it a memorable trip.",
            stars: 4
        },
        {
            spotId: 23,
            userId: 8,
            review: "Telluride's mountain chalet was perfect for adventure. Skiing and hot tub relaxation were highlights. We'll be back for more!",
            stars: 4
        },
        {
            spotId: 24,
            userId: 1,
            review: "Monterey's coastal haven was a dream come true. Watching whales from the deck was an unforgettable experience, and the seafood was divine.",
            stars: 5
        },
        {
            spotId: 25,
            userId: 2,
            review: "Lake Norman's lakefront paradise cabin was a peaceful retreat. Fishing and boating were perfect. Sunset views from the porch were stunning.",
            stars: 5
        }
        ], {})
    },
    down: async (queryInterface, Sequelize) => {
        options.tableName = 'Reviews';
        return queryInterface.bulkDelete(options)
    }
};