const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes/user");
const swaggerDocument = require("./swagger.json");
// Database
const db = require("./config/database");
// Test DB
// db.authenticate()
//   .then(() => console.log("Database connected...."))
//   .catch((err) => console.log(`Error: ${err}`));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
