const router = require("express").Router();
const userRoutes = require("./users");
const modelRoutes = require("./models");
const unitRoutes = require("./units");
const listRoutes = require("./lists");
const listUnitRoutes = require("./m2mlistunits");

// User routes
router.use("/users", userRoutes);
router.use("/models", modelRoutes);
router.use("/units", unitRoutes);
router.use("/lists", listRoutes);
router.use("/m2mlistunit", listUnitRoutes);

module.exports = router;
