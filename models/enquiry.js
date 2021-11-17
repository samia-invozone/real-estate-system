const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Enquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enquiry.init(
    {
      enquiry_number: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      property_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Enquiry",
    }
  );
  return Enquiry;
};
