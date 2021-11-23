const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const Joi = require("joi");
const cron = require("node-cron");
const routes = require("./routes/user");
const swaggerDocument = require("./swagger.json");
const job = require("./cron-jobs");
// Database
const db = require("./config/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

// cron.schedule("* * * * *", () => {
//   console.log(`Task is running every minute ${new Date()}`);
// });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
