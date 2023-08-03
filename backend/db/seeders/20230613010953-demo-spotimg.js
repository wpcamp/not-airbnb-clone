'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'SpotImages'
        return queryInterface.bulkInsert(options, [{
            spotId: 1,
            url: 'https://i.imgur.com/kAwNyxF.png',
            preview: true
        }, {
            spotId: 1,
            url: 'https://i.imgur.com/MzRolQx.png',
            preview: false
        }, {
            spotId: 1,
            url: 'https://i.imgur.com/L559q3x.png',
            preview: false
        }, {
            spotId: 1,
            url: 'https://i.imgur.com/LaDuiJS.png',
            preview: false
        }, {
            spotId: 1,
            url: 'https://i.imgur.com/J9yA7M7.png',
            preview: false
        },{
            spotId: 2,
            url: 'https://i.imgur.com/2a0OkQm.png',
            preview: true
        }, {
            spotId: 2,
            url: 'https://i.imgur.com/EUFZT8B.png',
            preview: false
        }, {
            spotId: 2,
            url: 'https://i.imgur.com/vPceRA9.png',
            preview: false
        }, {
            spotId: 2,
            url: 'https://i.imgur.com/WnnubMj.png',
            preview: false
        }, {
            spotId: 2,
            url: 'https://i.imgur.com/JLg24Iy.png',
            preview: false
        },{
            spotId: 3,
            url: 'https://i.imgur.com/QQkXgWS.jpg',
            preview: true
        }, {
            spotId: 3,
            url: 'https://i.imgur.com/5Xx5YbG.png',
            preview: false
        }, {
            spotId: 3,
            url: 'https://i.imgur.com/5vT6EJ7.png',
            preview: false
        }, {
            spotId: 3,
            url: 'https://i.imgur.com/rkCMzbU.png',
            preview: false
        }, {
            spotId: 3,
            url: 'https://i.imgur.com/ATrr12P.jpg',
            preview: false
        }, {
            spotId: 4,
            url: 'https://i.imgur.com/pz4WoNI.png',
            preview: true
        }, {
            spotId: 4,
            url: 'https://i.imgur.com/G3uJWBT.png',
            preview: false
        }, {
            spotId: 4,
            url: 'https://i.imgur.com/8SYlSsn.png',
            preview: false
        }, {
            spotId: 4,
            url: 'https://i.imgur.com/EzMbs9L.png',
            preview: false
        }, {
            spotId: 4,
            url: 'https://i.imgur.com/FXnVqbV.png',
            preview: false
        }, {
            spotId: 5,
            url: 'https://i.imgur.com/Zln3Ub0.png',
            preview: true
        }, {
            spotId: 5,
            url: 'https://i.imgur.com/5Py7mk8.png',
            preview: false
        }, {
            spotId: 5,
            url: 'https://i.imgur.com/1gMcipP.png',
            preview: false
        }, {
            spotId: 5,
            url: 'https://i.imgur.com/Ie0LN5l.png',
            preview: false
        }, {
            spotId: 5,
            url: 'https://i.imgur.com/5ewApDT.png',
            preview: false
        }, {
            spotId: 6,
            url: 'https://i.imgur.com/LFkDe6S.png',
            preview: true
        }, {
            spotId: 6,
            url: 'https://i.imgur.com/1OAAk9T.png',
            preview: false
        }, {
            spotId: 6,
            url: 'https://i.imgur.com/Y78r14i.png',
            preview: false
        }, {
            spotId: 6,
            url: 'https://i.imgur.com/fpzLHGX.png',
            preview: false
        }, {
            spotId: 6,
            url: 'https://i.imgur.com/Uc1BdXq.png',
            preview: false
        }], {})
    },
    down: async (queryInterface, Sequelize) => {
        options.tableName = 'SpotImages'
        return queryInterface.bulkDelete(options)
    }
};