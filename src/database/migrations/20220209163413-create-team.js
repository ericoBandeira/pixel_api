"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("teams", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("teams");
  },
};
