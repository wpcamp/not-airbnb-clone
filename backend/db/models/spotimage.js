'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SpotImage extends Model {
        static associate(models) {

            const Spot = models.Spot

            SpotImage.belongsTo(Spot, {
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