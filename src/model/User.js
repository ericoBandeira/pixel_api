const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        registration: { type: DataTypes.TEXT },
        password: { type: DataTypes.TEXT },
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Team, { foreignKey: "team_id" });
    this.hasOne(models.Pixel, { foreignKey: "user_id" });
  }
}

module.exports = User;
