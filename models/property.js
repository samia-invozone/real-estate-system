const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      property.belongsTo(models.User, {
        foreignKey: "user_id",
        constraints: false,
      });
      property.belongsToMany(models.Feature, {
        foreignKey: "property_id",
        through: "property_features",
        constraints: false,
      });
    }
  }
  property.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.STRING,
      location: DataTypes.STRING,
      no_of_bedroom: DataTypes.INTEGER,
      no_of_bathroom: DataTypes.INTEGER,
      no_of_floor: DataTypes.INTEGER,
      garage: DataTypes.STRING,
      area: DataTypes.STRING,
      size: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "properties",
      modelName: "Property",
    }
  );
  return property;
};
