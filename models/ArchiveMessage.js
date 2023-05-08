const sequelize = require('sequelize');
const db = require('../configs/database.js');

const ArchiveMessage = db.define('archiveMessage',{
    id: {
        primaryKey: true,
        type: sequelize.INTEGER(30),
        autoIncrement: true,
    },
    item_id: {
        // unique: true,
        type: sequelize.STRING(30),
        allowNull: false
    },
    sent_from: {
        type: sequelize.STRING(100),
        allowNull: false
    },
    message: {
        type: sequelize.STRING(1000),
        allowNull: false
    },
    fb_id:{
        type: sequelize.STRING(30),
        allowNull: false
    },
    mmc_user: {
        type: sequelize.STRING(100),
        allowNull: true
    },
    type: {
        type: sequelize.STRING(30),
        allowNull: true
    },
    status: {
        type: sequelize.STRING(30),
        allowNull: true
    },
    timestamp: {
        type: sequelize.STRING(15),
        allowNull: false
    },
    priority: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
},{
    timestamps: false,
    // freezeTableName: true,
    // tableName: 'archiveMessages'
});
// ArchiveMessage.sync({force: true});
module.exports = ArchiveMessage;