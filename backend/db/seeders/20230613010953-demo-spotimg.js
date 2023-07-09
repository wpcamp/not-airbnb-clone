'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        options.tableName = 'SpotImages'
        return queryInterface.bulkInsert(options, [{
                spotId: 1,
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Dartmouth_College_campus_2007-06-23_Alumni_Gymnasium_01.JPG/270px-Dartmouth_College_campus_2007-06-23_Alumni_Gymnasium_01.JPG',
                preview: true
            },
            {
                spotId: 2,
                url: 'https://images.otstatic.com/prod1/29145482/2/large.jpg',
                preview: false
            },
            {
                spotId: 3,
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Buckingham_Palace_aerial_view_2016_%28cropped%29.jpg/1200px-Buckingham_Palace_aerial_view_2016_%28cropped%29.jpg',
                preview: true
            },
            {
                spotId: 4,
                url: 'https://images1.apartments.com/i2/P-ojx1Xv2unTJbGZnQSEDlqja9isZx6jSN0xdwzsq0M/111/99-federal-st-unit-505-portland-me-building-photo.jpg',
                preview: true
            },{
                spotId: 5,
                url: 'https://ssl.cdn-redfin.com/photo/180/bigphoto/899/1524899_0.jpg',
                preview: true
            }
        ], {})
    },
    down: async(queryInterface, Sequelize) => {
        options.tableName = 'SpotImages'
        return queryInterface.bulkDelete(options)
    }
};