module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("property_features", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      property_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "properties",
          },
          key: "id",
        },
        allowNull: true,
      },
      feature_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "features",
          },
          key: "id",
        },
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("property_features");
  },
};
