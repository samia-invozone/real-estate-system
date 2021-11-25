const express = require("express");

const app = express();

const auth = require("./api/admin/auth.routes");

const user = require("./api/user/user.routes");

const property = require("./api/admin/property.routes");

app.use("/api", user);
app.use("/api/auth", auth);
app.use("/api/admin", property);

module.exports = app;
