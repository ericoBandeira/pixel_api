"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("pixels", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.TEXT, allowNull: false },
      eye: { type: DataTypes.TEXT, allowNull: false },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("pixels");
  },
};
