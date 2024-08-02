'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      session.belongsTo(models.user,{foreignKey:"user_id"})
    }
  }
  session.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"users",
        key:"id"
      }
    },
    session_token: {
      type: DataTypes.STRING,
      allowNull:false
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull:false
    },
    device_type: {
      type: DataTypes.STRING,
      allowNull:false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt:{
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'session',
  });
  return session;
};