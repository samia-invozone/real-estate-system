module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("properties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      no_of_bedroom: {
        type: Sequelize.INTEGER,
      },
      no_of_bathroom: {
        type: Sequelize.INTEGER,
      },
      no_of_floor: {
        type: Sequelize.INTEGER,
      },
      garage: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("properties");
  },
};
