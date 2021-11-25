const express = require("express");

const path = require("path");

const swaggerUi = require("swagger-ui-express");

const Joi = require("joi");

const cron = require("node-cron");

const indexRoutes = require("./routes/index.routes");

const swaggerDocument = require("./swagger.json");

// const job = require("./cron-jobs");

const db = require("./config/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
