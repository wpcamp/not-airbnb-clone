'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Spots';
        return queryInterface.bulkInsert(options, [{
            ownerId: 1,
            address: '123 Cedar Street',
            city: 'Hanover',
            state: 'New Hampshire',
            country: 'United States of America',
            lat: 43.7022,
            lng: -72.2896,
            name: 'Alumni Gym Apartments',
            description: 'Welcome to The Dartmouth Alumni Gym Apartments, where history meets modern luxury. Once a bustling college gym, this exclusive residence now offers elegantly designed apartments with state-of-the-art amenities. Embrace the charm of exposed brick walls and high ceilings, while enjoying the convenience of a fully equipped fitness center and rooftop pool.',
            price: 450.00
        }, {
            ownerId: 2,
            address: '432 Elm Street',
            city: 'Norwich',
            state: 'Vermont',
            country: 'United States of America',
            lat: 43.7153,
            lng: -72.3079,
            name: 'Carpenter and Main',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 175.00
        }, {
            ownerId: 1,
            address: '89 Sedgemore Lane',
            city: 'Austin',
            state: 'Texas',
            country: 'United States of America',
            lat: 30.2672,
            lng: -97.7431,
            name: 'Buckingham Palace Inspired Castle',
            description: 'Experience the epitome of British grandeur in the heart of Texas. Immerse yourself in opulent State Rooms, breathtaking gardens, and historic charm. A unique opportunity to live like royalty, surrounded by centuries of majestic history and iconic landmarks.',
            price: 4500.00
        }, {
            ownerId: 3,
            address: '543 Munjoy Hill',
            city: 'Portland',
            state: 'Maine',
            country: 'United States of America',
            lat: 43.6591,
            lng: -70.2568,
            name: 'Oceanview Luxury Apartment',
            description: 'Great apartment with all utilities included. Brand-new kitchen, two bedroom, and small yard with grill. Greate neighborhood, with a fire station nearby in case of any accidents!',
            price: 299.99
        }, {
            ownerId: 4,
            address: '15 Winter Street',
            city: 'Waterville',
            state: 'Maine',
            country: 'United States of America',
            lat: 44.5520,
            lng: -69.6317,
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
            lat: 41.931829,
            lng: -73.907437,
            name: 'Architectural wonder in the woods',
            description: 'Unique experience, secluded. Enjoy a weekend or a few days eco-friendly retreat in an architectural, geometric masterpiece on 30 preserved acres just minutes from all that Rhinebeck and the Hudson Valley have to offer.',
            price: 325.99
        },
        {
            ownerId: 1,
            address: "123 Ocean View Drive",
            city: "Miami Beach",
            state: "Florida",
            country: "United States of America",
            lat: 25.782354,
            lng: -80.130087,
            name: "Beachfront Bliss Bungalow",
            description: "Escape to this cozy bungalow just steps from the sandy shores of Miami Beach. Enjoy breathtaking ocean views, a private patio, and easy access to vibrant nightlife.",
            price: 250
        },
        {
            ownerId: 2,
            address: "456 Mountain Retreat Lane",
            city: "Aspen",
            state: "Colorado",
            country: "United States of America",
            lat: 39.187908,
            lng: -106.818744,
            name: "Luxury Ski Chalet",
            description: "Experience the ultimate winter getaway in our luxurious ski chalet. Enjoy world-class skiing, a hot tub, and stunning mountain views.",
            price: 500
        },
        {
            ownerId: 3,
            address: "789 Lakeside Haven Road",
            city: "Lake Tahoe",
            state: "California",
            country: "United States of America",
            lat: 39.096849,
            lng: -120.032351,
            name: "Serene Lakefront Cabin",
            description: "Relax in this charming lakefront cabin nestled in the heart of Lake Tahoe. Unwind by the fireplace or take a paddleboat out on the crystal-clear waters.",
            price: 300
        },
        {
            ownerId: 4,
            address: "101 Redwood Retreat",
            city: "Big Sur",
            state: "California",
            country: "United States of America",
            lat: 36.237577,
            lng: -121.770534,
            name: "Redwood Treehouse Retreat",
            description: "Stay in a treehouse surrounded by ancient redwoods in Big Sur. Experience the magic of the forest, soak in a private hot tub, and stargaze from your deck.",
            price: 350
        },
        {
            ownerId: 5,
            address: "222 Desert Oasis Lane",
            city: "Sedona",
            state: "Arizona",
            country: "United States of America",
            lat: 34.867834,
            lng: -111.760991,
            name: "Desert Dream Villa",
            description: "Discover the beauty of the red rock desert in Sedona. Our villa offers panoramic views, a swimming pool, and access to hiking trails.",
            price: 275
        },
        {
            ownerId: 6,
            address: "333 Vineyard Cottage Road",
            city: "Napa Valley",
            state: "California",
            country: "United States of America",
            lat: 38.502469,
            lng: -122.265389,
            name: "Charming Vineyard Cottage",
            description: "Experience the romance of Napa Valley in our charming cottage. Sip wine on the vineyard, relax in a private hot tub, and dine at world-class restaurants.",
            price: 400
        },
        {
            ownerId: 7,
            address: "444 Coastal Escape Drive",
            city: "Cape Cod",
            state: "Massachusetts",
            country: "United States of America",
            lat: 41.689524,
            lng: -70.229506,
            name: "Seaside Retreat",
            description: "Escape to the picturesque shores of Cape Cod. Enjoy sandy beaches, scenic bike rides, and fresh seafood in this cozy seaside retreat.",
            price: 275
        },
        {
            ownerId: 1,
            address: "555 Mountain View Lodge",
            city: "Breckenridge",
            state: "Colorado",
            country: "United States of America",
            lat: 39.481653,
            lng: -106.038351,
            name: "Mountain View Lodge",
            description: "Stay in a spacious mountain lodge with stunning views of the Rockies. Ski-in/ski-out access, a private sauna, and a game room await you.",
            price: 450
        },
        {
            ownerId: 2,
            address: "666 Desert Hideaway Road",
            city: "Scottsdale",
            state: "Arizona",
            country: "United States of America",
            lat: 33.685546,
            lng: -111.867426,
            name: "Desert Oasis Retreat",
            description: "Escape to a luxurious desert oasis in Scottsdale. Relax by the pool, play golf on nearby courses, and explore the vibrant art scene.",
            price: 350
        },
        {
            ownerId: 3,
            address: "777 Lakeside Cabin Lane",
            city: "Lake Placid",
            state: "New York",
            country: "United States of America",
            lat: 44.286336,
            lng: -73.981713,
            name: "Cozy Lakeside Cabin",
            description: "Experience the tranquility of Lake Placid in our cozy lakeside cabin. Fish from your private dock, hike in the Adirondacks, and roast marshmallows by the firepit.",
            price: 275
        },
        {
            ownerId: 4,
            address: "888 Beachfront Paradise Road",
            city: "Destin",
            state: "Florida",
            country: "United States of America",
            lat: 30.391416,
            lng: -86.510581,
            name: "Beachfront Paradise Villa",
            description: "Step into paradise with our beachfront villa in Destin. Enjoy white sandy beaches, a private pool, and stunning Gulf of Mexico views.",
            price: 425
        },
        {
            ownerId: 5,
            address: "999 Rocky Mountain Retreat",
            city: "Estes Park",
            state: "Colorado",
            country: "United States of America",
            lat: 40.377206,
            lng: -105.519442,
            name: "Rocky Mountain Cabin",
            description: "Escape to the Rockies in our charming mountain cabin. Hike in Rocky Mountain National Park, soak in a hot tub, and stargaze by the firepit.",
            price: 300
        },
        {
            ownerId: 6,
            address: "1111 Coastal Cottage Lane",
            city: "Charleston",
            state: "South Carolina",
            country: "United States of America",
            lat: 32.777017,
            lng: -79.929086,
            name: "Charleston Coastal Cottage",
            description: "Experience Southern charm in our coastal cottage in Charleston. Walk to historic sites, dine on delicious seafood, and relax on the porch swing.",
            price: 325
        },
        {
            ownerId: 7,
            address: "1234 Lakeside Manor Drive",
            city: "Lake Geneva",
            state: "Wisconsin",
            country: "United States of America",
            lat: 42.591834,
            lng: -88.430609,
            name: "Lakefront Manor",
            description: "Indulge in luxury at our lakefront manor in Lake Geneva. Enjoy water sports, a private dock, and exquisite dining in this opulent retreat.",
            price: 550
        },
        {
            ownerId: 1,
            address: "1357 Desert Rose Retreat",
            city: "Palm Springs",
            state: "California",
            country: "United States of America",
            lat: 33.814469,
            lng: -116.536159,
            name: "Desert Rose Villa",
            description: "Relax in style at our desert rose villa in Palm Springs. Bask in the sun by the pool, explore art galleries, and dine at trendy restaurants.",
            price: 375
        },
        {
            ownerId: 2,
            address: "1492 Mountain Chalet Lane",
            city: "Telluride",
            state: "Colorado",
            country: "United States of America",
            lat: 37.937494,
            lng: -107.810429,
            name: "Mountain Chalet Retreat",
            description: "Experience the rugged beauty of Telluride in our mountain chalet. Ski down the slopes, hike in the wilderness, and relax in a hot tub under the stars.",
            price: 475
        },
        {
            ownerId: 3,
            address: "1616 Coastal Haven Road",
            city: "Monterey",
            state: "California",
            country: "United States of America",
            lat: 36.616232,
            lng: -121.902942,
            name: "Coastal Haven Retreat",
            description: "Escape to a coastal haven in Monterey. Watch whales from your deck, explore the famous aquarium, and savor fresh seafood at local restaurants.",
            price: 400
        },
        {
            ownerId: 4,
            address: "1776 Lakeside Paradise Drive",
            city: "Lake Norman",
            state: "North Carolina",
            country: "United States of America",
            lat: 35.570784,
            lng: -80.907694,
            name: "Lakefront Paradise Cabin",
            description: "Unwind at our lakefront paradise cabin on Lake Norman. Fish from the dock, go boating, and enjoy stunning sunsets from the porch.",
            price: 325
        },
        {
            ownerId: 5,
            address: "1888 Strafford Lane",
            city: "Sonoma",
            state: "California",
            country: "United States of America",
            lat: 38.291852,
            lng: -122.458189,
            name: "Wine Country Earthouse",
            description: "Escape to wine country in our charming modern home in Sonoma. Explore vineyards, sip fine wines, and dine at gourmet restaurants.",
            price: 350
        }
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = 'Spots';
        return queryInterface.bulkDelete(options)
    }
};