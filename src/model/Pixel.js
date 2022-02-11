const { Model, DataTypes } = require("sequelize");

class Pixel extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: DataTypes.TEXT, allowNull: false },
        eye: { type: DataTypes.TEXT, allowNull: false },
      },
      {
        sequelize,
        tableName: "pixels",
      }
    );
  }

  static associate(models) {}
}

module.exports = Pixel;
