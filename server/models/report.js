'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     report.belongsTo(models.user,{foreignKey:'user_id'})
    }
  }
  report.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"users",
        key:'id'
      }
    },
    report_date: {
      type: DataTypes.DATE,
      allowNull:false
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull:false,
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
    modelName: 'report',
    paranoid:true
  });
  return report;
};