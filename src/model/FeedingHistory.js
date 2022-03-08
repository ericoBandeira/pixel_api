const { Model, DataTypes } = require("sequelize");

class FeedingHistory extends Model {
  static init(sequelize) {
    super.init(
      {
        feature_name: { type: DataTypes.TEXT },
        fed_at: { type: DataTypes.DATE },
        active: { type: DataTypes.BOOLEAN },
      },
      {
        sequelize,
        tableName: "feeding_history",
      }
    );
  }
}

module.exports = { FeedingHistory };
