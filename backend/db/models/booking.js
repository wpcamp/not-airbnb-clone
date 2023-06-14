'use strict';
const {
    Model
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {

            const User = models.User
            const Spot = models.Spot

            Booking.belongsTo(User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE'
            })
            Booking.belongsTo(Spot, {
                foreignKey: 'spotId',
                onDelete: 'CASCADE'
            })
        }
    }
    Booking.init({
        spotId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
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
        modelName: 'Booking',
    });
    return Booking;
};