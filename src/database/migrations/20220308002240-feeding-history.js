"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("feeding_history", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      feature_name: { type: Sequelize.TEXT, allowNull: false },
      active: { type: Sequelize.BOOLEAN, allowNull: false },
      fed_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fed_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pixel_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "pixels", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("feeding_history");
  },
};
