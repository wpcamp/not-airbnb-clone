'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'ReviewImages';
        return queryInterface.bulkInsert(options, [{
                reviewId: 1,
                url: 'https://fastly.picsum.photos/id/78/1584/2376.jpg?hmac=80UVSwpa9Nfcq7sQ5kxb9Z5sD2oLsbd5zkFO5ybMC4E',
            },
            {
                reviewId: 7,
                url: 'https://fastly.picsum.photos/id/424/2048/1536.jpg?hmac=fGHKd0RIzyexEluCiUoUKbWIdoy3wABPUC6GWlvgyaI',
            }, {
                reviewId: 3,
                url: 'https://fastly.picsum.photos/id/193/3578/2451.jpg?hmac=M5yoazhwdwMa_27rC5-S50SNFvCy4Kni0wXoa6iVF0g',
            }, {
                reviewId: 11,
                url: 'https://fastly.picsum.photos/id/437/4128/2716.jpg?hmac=j6COqB2RtRcMa56wHOd4qZbRPIUmjWrV_Ax73-tP_go',
            }, {
                reviewId: 15,
                url: 'https://fastly.picsum.photos/id/188/2896/1936.jpg?hmac=tKGI_u_jJ-s7wzHbJibhbflqi57bIpH9g7FJXnTfJao',
            }, {
                reviewId: 18,
                url: 'https://fastly.picsum.photos/id/76/4912/3264.jpg?hmac=VkFcSa2Rbv0R0ndYnz_FAmw02ON1pPVjuF_iVKbiiV8',
            }
        ], {})
    },
    down: async(queryInterface, Sequelize) => {
        options.tableName = 'ReviewImages'
        return queryInterface.bulkDelete(options)
    }
};