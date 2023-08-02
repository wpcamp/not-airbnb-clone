'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SpotImage extends Model {
        static associate(models) {
            SpotImage.belongsTo(models.Spot, {
                foreignKey: 'spotId',
                onDelete: 'CASCADE'
            })
        }
    }
    SpotImage.init({
        spotId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url: {
            type: DataTypes.TEXT,
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