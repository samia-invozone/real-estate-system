module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("enquiry_answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      answer: {
        type: Sequelize.STRING,
      },
      enquiry_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "enquiries",
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
    await queryInterface.dropTable("enquiry_answers");
  },
};
