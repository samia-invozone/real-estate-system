const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PropertyFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PropertyFeature.init(
    {
      property_id: DataTypes.INTEGER,
      feature_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PropertyFeature",
      tableName: "property_features",
    }
  );
  return PropertyFeature;
};
