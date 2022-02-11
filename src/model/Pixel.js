const { Model, DataTypes } = require("sequelize");

class Pixel extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.INTEGER },
        name: { type: DataTypes.TEXT },
        eye: { type: DataTypes.TEXT },
      },
      {
        sequelize,
        tableName: "pixels",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Team, { foreignKey: "team_id" });
    this.hasMany(models.Feature, { foreignKey: "pixel_id", as: "pixel_features" });
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = Pixel;
