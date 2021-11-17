module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("roles", [
      {
        id: "1",
        name: "Admin",
        slug: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Property Owner",
        slug: "property_owner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        name: "Broker",
        slug: "broker",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4",
        name: "Buyer",
        slug: "buyer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete("roles", null, {}),
};
