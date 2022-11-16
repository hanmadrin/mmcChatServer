const sequelize = require('sequelize');
const db = require('../configs/database.js');

const Account = db.define('account',{
    id: {
        primaryKey: true,
        type: sequelize.INTEGER(10),
        autoIncrement: true,
    },
    deviceId:{
        type: sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    accountName: {
        type: sequelize.STRING(100),
        allowNull: false,
        defaultValue: '',
    },
    mainSwitch:{
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    debugSwitch:{
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    readMessageLimit:{
        type: sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: 10
    },
    readMessageDays:{
        type: sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: 1
    },
    hourlyLimitData:{
        type: sequelize.STRING(1000),
        allowNull: false,
        defaultValue: `${JSON.stringify({
            "h8": {"n": 0, "r": 0},
            "h9": {"n": 0, "r": 0},
            "h10": {"n": 0, "r": 0},
            "h11": {"n": 0, "r": 0},
            "h12": {"n": 0, "r": 0},
            "h13": {"n": 0, "r": 0},
            "h14": {"n": 0, "r": 0},
            "h15": {"n": 0, "r": 0},
            "h16": {"n": 0, "r": 0},
            "h17": {"n": 0, "r": 0},
            "h18": {"n": 0, "r": 0},
            "h19": {"n": 0, "r": 0},
        })}`
    }
},{
    timestamps: false,
    // freezeTableName: true,
    // tableName: 'Accounts'
});
// Account.sync({force: true});
module.exports = Account;