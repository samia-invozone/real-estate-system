const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Feature.belongsToMany(models.Property, {
        foreignKey: "feature_id",
        through: "property_features",
      });
    }
  }
  Feature.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Feature",
      tableName: "features",
    }
  );
  return Feature;
};
