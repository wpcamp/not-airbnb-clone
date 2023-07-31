'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Spot extends Model {
        static associate(models) {
            Spot.belongsTo(models.User, {
                foreignKey: 'ownerId',
                as: 'Owner',
            })
            Spot.hasMany(models.SpotImage, {
                foreignKey: 'spotId',
                onDelete: 'CASCADE'
            })
            Spot.hasMany(models.Review, {
                foreignKey: 'spotId',
                onDelete: 'CASCADE'
            })
            Spot.hasMany(models.Booking, {
                foreignKey: 'spotId',
                onDelete: 'CASCADE'
            })
        }
    }
    Spot.init({
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            // validate: {
            //     min: -90,
            //     max: 90
            // }
        },
        lng: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            // validate: {
            //     min: -180,
            //     max: 180
            // }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
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
        modelName: 'Spot',
    });
    return Spot;
};