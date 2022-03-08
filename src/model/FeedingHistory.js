const { Model, DataTypes } = require("sequelize");

class FeedingHistory extends Model {
  static init(sequelize) {
    super.init(
      {
        feature_name: { type: DataTypes.TEXT },
        fed_at: { type: DataTypes.DATE },
        fed_by: { type: DataTypes.INTEGER },
        active: { type: DataTypes.BOOLEAN },
      },
      {
        sequelize,
        tableName: "feeding_history",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Pixel, { foreignKey: "pixel_id" });
  }
}

module.exports = { FeedingHistory };
