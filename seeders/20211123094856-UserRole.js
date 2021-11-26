module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("user_roles", [
      {
        id: "1",
        user_id: "1",
        role_id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete("user_roles", null, {}),
};
