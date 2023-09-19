'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; 
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
            url: 'https://i.imgur.com/rntB4pq.png',
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
        },{
            spotId: 7,
            url: "https://i.imgur.com/hxjZMfD.jpg",
            preview: true
          },
          {
            spotId: 7,
            url: "",
            preview: false
          },
          {
            spotId: 7,
            url: "",
            preview: false
          },
          {
            spotId: 7,
            url: "",
            preview: false
          },
          {
            spotId: 7,
            url: "",
            preview: false
          },
          {
            spotId: 8,
            url: "https://i.imgur.com/Ny2ZEPu.png",
            preview: true
          },
          {
            spotId: 8,
            url: "",
            preview: false
          },
          {
            spotId: 8,
            url: "",
            preview: false
          },
          {
            spotId: 8,
            url: "",
            preview: false
          },
          {
            spotId: 8,
            url: "",
            preview: false
          },
          {
            spotId: 9,
            url: "https://i.imgur.com/jfrZ5Rq.png",
            preview: true
          },
          {
            spotId: 9,
            url: "",
            preview: false
          },
          {
            spotId: 9,
            url: "",
            preview: false
          },
          {
            spotId: 9,
            url: "",
            preview: false
          },
          {
            spotId: 9,
            url: "",
            preview: false
          },
          {
            spotId: 10,
            url: "https://i.imgur.com/wOwJPxf.png",
            preview: true
          },
          {
            spotId: 10,
            url: "",
            preview: false
          },
          {
            spotId: 10,
            url: "",
            preview: false
          },
          {
            spotId: 10,
            url: "",
            preview: false
          },
          {
            spotId: 10,
            url: "",
            preview: false
          },
          {
            spotId: 11,
            url: "https://i.imgur.com/bKYEZWM.png",
            preview: true
          },
          {
            spotId: 11,
            url: "",
            preview: false
          },
          {
            spotId: 11,
            url: "",
            preview: false
          },
          {
            spotId: 11,
            url: "",
            preview: false
          },
          {
            spotId: 11,
            url: "",
            preview: false
          },
          {
            spotId: 12,
            url: "https://i.imgur.com/S9EjKZG.png",
            preview: true
          },
          {
            spotId: 12,
            url: "",
            preview: false
          },
          {
            spotId: 12,
            url: "",
            preview: false
          },
          {
            spotId: 12,
            url: "",
            preview: false
          },
          {
            spotId: 12,
            url: "",
            preview: false
          },
          {
            spotId: 13,
            url: "https://i.imgur.com/by4wIxR.png",
            preview: true
          },
          {
            spotId: 13,
            url: "",
            preview: false
          },
          {
            spotId: 13,
            url: "",
            preview: false
          },
          {
            spotId: 13,
            url: "",
            preview: false
          },
          {
            spotId: 13,
            url: "",
            preview: false
          },
          {
            spotId: 14,
            url: "https://i.imgur.com/poRxFid.png",
            preview: true
          },
          {
            spotId: 14,
            url: "",
            preview: false
          },
          {
            spotId: 14,
            url: "",
            preview: false
          },
          {
            spotId: 14,
            url: "",
            preview: false
          },
          {
            spotId: 14,
            url: "",
            preview: false
          },
          {
            spotId: 15,
            url: "https://i.imgur.com/0IkkDDG.png",
            preview: true
          },
          {
            spotId: 15,
            url: "",
            preview: false
          },
          {
            spotId: 15,
            url: "",
            preview: false
          },
          {
            spotId: 15,
            url: "",
            preview: false
          },
          {
            spotId: 15,
            url: "",
            preview: false
          },
          {
            spotId: 16,
            url: "https://i.imgur.com/UTQGNhD.png",
            preview: true
          },
          {
            spotId: 16,
            url: "",
            preview: false
          },
          {
            spotId: 16,
            url: "",
            preview: false
          },
          {
            spotId: 16,
            url: "",
            preview: false
          },
          {
            spotId: 16,
            url: "",
            preview: false
          },
          {
            spotId: 17,
            url: "https://i.imgur.com/F6Ku7g7.png",
            preview: true
          },
          {
            spotId: 17,
            url: "",
            preview: false
          },
          {
            spotId: 17,
            url: "",
            preview: false
          },
          {
            spotId: 17,
            url: "",
            preview: false
          },
          {
            spotId: 17,
            url: "",
            preview: false
          },
          {
            spotId: 18,
            url: "https://i.imgur.com/E6QWNqp.png",
            preview: true
          },
          {
            spotId: 18,
            url: "",
            preview: false
          },
          {
            spotId: 18,
            url: "",
            preview: false
          },
          {
            spotId: 18,
            url: "",
            preview: false
          },
          {
            spotId: 18,
            url: "",
            preview: false
          },
          {
            spotId: 19,
            url: "https://i.imgur.com/k4hqYjm.png",
            preview: true
          },
          {
            spotId: 19,
            url: "",
            preview: false
          },
          {
            spotId: 19,
            url: "",
            preview: false
          },
          {
            spotId: 19,
            url: "",
            preview: false
          },
          {
            spotId: 19,
            url: "",
            preview: false
          },
          {
            spotId: 20,
            url: "https://i.imgur.com/4iFj3dY.png",
            preview: true
          },
          {
            spotId: 20,
            url: "https://i.imgur.com/vAbHYOM.png",
            preview: false
          },
          {
            spotId: 20,
            url: "",
            preview: false
          },
          {
            spotId: 20,
            url: "",
            preview: false
          },
          {
            spotId: 20,
            url: "",
            preview: false
          },
          {
            spotId: 21,
            url: "https://i.imgur.com/jzCdvQO.jpg",
            preview: true
          },
          {
            spotId: 21,
            url: "",
            preview: false
          },
          {
            spotId: 21,
            url: "",
            preview: false
          },
          {
            spotId: 21,
            url: "",
            preview: false
          },
          {
            spotId: 21,
            url: "",
            preview: false
          },
          {
            spotId: 22,
            url: "https://i.imgur.com/AaasuMe.jpg",
            preview: true
          },
          {
            spotId: 22,
            url: "",
            preview: false
          },
          {
            spotId: 22,
            url: "",
            preview: false
          },
          {
            spotId: 22,
            url: "",
            preview: false
          },
          {
            spotId: 22,
            url: "",
            preview: false
          },
          {
            spotId: 23,
            url: "https://i.imgur.com/TtQnpY6.png",
            preview: true
          },
          {
            spotId: 23,
            url: "",
            preview: false
          },
          {
            spotId: 23,
            url: "",
            preview: false
          },
          {
            spotId: 23,
            url: "",
            preview: false
          },
          {
            spotId: 23,
            url: "",
            preview: false
          },
          {
            spotId: 24,
            url: "https://i.imgur.com/I34esZu.png",
            preview: true
          },
          {
            spotId: 24,
            url: "",
            preview: false
          },
          {
            spotId: 24,
            url: "",
            preview: false
          },
          {
            spotId: 24,
            url: "",
            preview: false
          },
          {
            spotId: 24,
            url: "",
            preview: false
          },
          {
            spotId: 25,
            url: "https://i.imgur.com/m50uxck.png",
            preview: true
          },
          {
            spotId: 25,
            url: "",
            preview: false
          },
          {
            spotId: 25,
            url: "",
            preview: false
          },
          {
            spotId: 25,
            url: "",
            preview: false
          },
          {
            spotId: 25,
            url: "",
            preview: false
          }
    ], {})
    },
    down: async (queryInterface, Sequelize) => {
        options.tableName = 'SpotImages'
        return queryInterface.bulkDelete(options)
    }
};