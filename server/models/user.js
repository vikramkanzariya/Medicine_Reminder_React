'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.role,{foreignKey:"role_id"})
      user.hasMany(models.session,{foreignKey:"user_id"})
      user.hasMany(models.report,{foreignKey:'user_id'})
      user.hasMany(models.medication,{foreignKey:"user_id"})
    }
  }
  user.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"roles",
        key:'id'
      }
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
    modelName: 'user',
    paranoid:true
  });
  return user;
};