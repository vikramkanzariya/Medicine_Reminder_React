'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medication_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medication_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'medications',
          key:'id'
        }
      },
      taken_at: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue:"pending"
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
        type:Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('medication_logs');
  }
};