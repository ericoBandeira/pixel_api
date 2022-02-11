const { Model, DataTypes } = require("sequelize");

class Team extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.INTEGER },
      },
      {
        sequelize,
        tableName: "teams",
      }
    );
  }

  static associate(models) {
    this.belongsTo();
  }
}

module.exports = Team;
