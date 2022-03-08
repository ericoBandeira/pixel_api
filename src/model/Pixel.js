const { Model, DataTypes } = require("sequelize");

class Pixel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.TEXT },
        eye: { type: DataTypes.TEXT },
        color: { type: DataTypes.TEXT },
      },
      {
        sequelize,
        tableName: "pixels",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Team, { foreignKey: "team_id" });
    this.hasMany(models.Feature, { foreignKey: "pixel_id" });
    this.hasMany(models.FeedingHistory, { foreignKey: "pixel_id" });
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = Pixel;
