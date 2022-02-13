const { Model, DataTypes } = require("sequelize");

class Team extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true },
      },
      {
        sequelize,
        tableName: "teams",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: "team_id", as: "team_users" });
    this.hasOne(models.Pixel, { foreignKey: "team_id", as: "team_pixel" });
  }
}

module.exports = Team;
