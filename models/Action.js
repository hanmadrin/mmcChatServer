const sequelize = require('sequelize');
const db = require('../configs/database.js');

const Action = db.define('action',{
    id: {
        primaryKey: true,
        type: sequelize.INTEGER(30),
        autoIncrement: true,
    },
    item_id: {
        // unique: true,
        type: sequelize.STRING(30),
        allowNull: true
    },
    mmc_user :{
        type: sequelize.STRING(200),
        allowNull: true
    },
    action:{
        type: sequelize.STRING(100),
        allowNull: false
    },
    timestamp: {
        type: sequelize.STRING(15),
        allowNull: false
    },  
},{
    timestamps: false,
    // freezeTableName: true,
    // tableName: 'actions'
});
// Action.sync({force: true});
module.exports = Action;