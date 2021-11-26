const express = require("express");

const app = express();

const auth = require("./api/admin/auth.routes");

const user = require("./api/user/auth.routes");

const property = require("./api/property.routes");

const countryStateCity = require("./api/country-state-city.routes");

app.use("/api", user);
app.use("/api/auth", auth);
app.use("/api", property);
app.use("/get", countryStateCity);

module.exports = app;
