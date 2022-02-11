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
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "teams", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "teams", key: "id" },
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
    return await queryInterface.dropTable("pixels");
  },
};
