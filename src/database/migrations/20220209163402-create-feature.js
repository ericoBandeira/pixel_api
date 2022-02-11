"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("features", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.TEXT, allowNull: false },
      value: { type: DataTypes.TEXT, allowNull: false },
      active: { type: DataTypes.BOOLEAN, allowNull: false },
      feeding_date: { type: DataTypes.DATE, allowNull: false },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("features");
  },
};
