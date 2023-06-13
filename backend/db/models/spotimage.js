'use strict';
const {
    Model
} = require('sequelize');
const { Spot } = require('../models')
module.exports = (sequelize, DataTypes) => {
    class SpotImage extends Model {
        static associate(models) {
            SpotImage.belongsTo(models.Spot, {
                foreignKey: 'spotId'
            })
        }
    }
    SpotImage.init({
        spotId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preview: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'SpotImage',
    });
    return SpotImage;
};