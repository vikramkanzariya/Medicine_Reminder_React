'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull:false
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      end_date: {
        type: Sequelize.DATEONLY
      },
      time: {
        type: Sequelize.TIME,
        allowNull:false
      },
      frequency: {
        type: Sequelize.STRING
      },
      day_of_week: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('medications');
  }
};