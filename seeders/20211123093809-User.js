const bcrypt = require("bcrypt");

//const salt = bcrypt.genSalt(10);
const password = "password";
const hash = bcrypt.hashSync(password, 10);
module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("users", [
      {
        id: "1",
        first_name: "Admin",
        last_name: "User",
        email: "admin@admin.com",
        password: hash,
        account_status: "approved",
        verified_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};
