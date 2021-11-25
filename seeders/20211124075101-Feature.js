module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("features", [
      {
        id: "1",
        name: "Center Cooling",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Balcony",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        name: "Fire Alarm",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4",
        name: "Elevator",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5",
        name: "Gym",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6",
        name: "Emergency Exit",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7",
        name: "Laundary",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8",
        name: "Pool",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete("features", null, {}),
};
