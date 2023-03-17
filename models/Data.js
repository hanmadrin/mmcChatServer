const db = require('../configs/database.js');
const { DataTypes } = require("sequelize");

const Data = db.define(
    "data",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time_data: {
            type: DataTypes.STRING,
            defaultValue: `{"h8":0,"h9":0,"h10":0,"h11":0,"h12":0,"h13":0,"h14":0,"h15":0,"h16":0,"h17":0,"h18":0,"h19":0}`,
            allowNull: false,
        },
        display_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        device_id:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '1-1'
        },
        current: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        max: {
            type: DataTypes.INTEGER,
            defaultValue: 43,
            allowNull: false,
        },
    },
    {
        tableName: "datas",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    },

);
// sync force
// Data.sync({ force: true });
module.exports = Data;