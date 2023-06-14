'use strict';
const {
    Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class ReviewImage extends Model {
        static associate(models) {

            const Review = models.Review

            ReviewImage.belongsTo(Review, {
                foreignKey: 'reviewId'
            })
        }
    }
    ReviewImage.init({
        reviewId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'ReviewImage',
    });
    return ReviewImage;
};