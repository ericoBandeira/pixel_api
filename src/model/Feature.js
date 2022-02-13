const { Model, DataTypes } = require("sequelize");

class Feature extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        name: { type: DataTypes.TEXT },
        value: { type: DataTypes.INTEGER },
        active: { type: DataTypes.BOOLEAN },
        feeding_date: { type: DataTypes.DATE },
      },
      {
        sequelize,
        tableName: "features",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Pixel, { foreignKey: "pixel_id" });
  }
}

module.exports = Feature;
