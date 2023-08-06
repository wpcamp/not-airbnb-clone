'use strict';
const {
    Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models.Spot, {
                foreignKey: 'spotId',
                onDelete: 'CASCADE'
            })
            Review.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE'
            })
            Review.hasMany(models.ReviewImage, {
                foreignKey: 'reviewId',
                onDelete: 'CASCADE'
            })
        }
    }
    Review.init({
        spotId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        stars: {
            type: DataTypes.INTEGER,
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
        modelName: 'Review',
    });
    return Review;
};