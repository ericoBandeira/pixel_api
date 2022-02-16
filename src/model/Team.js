const { Model, DataTypes } = require("sequelize");

class Team extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: "teams",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: "team_id" });
    this.hasOne(models.Pixel, { foreignKey: "team_id" });
  }
}

module.exports = Team;
