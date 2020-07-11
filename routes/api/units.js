const router = require("express").Router();
const db = require("../../models");
const { uuid } = require("uuidv4");
const bcrypt = require("bcryptjs");

module.exports = router
  .get("/", async (req, res) => {
    try {
      const units = await db.Units.findAll();
      return res.status(200).json(units);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post(
    "/create",
    async ({ body: { name, modelCount, modelType, userId } }, res) => {
      if (!name || !modelCount || !modelType) {
        return res.status(400).json({});
      }

      try {
        const unit = await db.Unit.create({
          id: uuid(),
          name,
          modelCount,
          modelType,
          userId,
        });
        return res.status(200).json(Unit);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  )
  .post("/find", async ({ body: { field, value } }, res) => {
    if (!field || !value) {
      return res.status(400).json({});
    }

    try {
      const query = `SELECT * FROM Unit WHERE ${field} = ${value} ORDER BY name`;
      const units = await db.sequelize.query(query, {
        model: db.Unit,
        mapToModel: true,
      });

      return res.status(200).json(units);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .delete("/delete", async ({ body: { id } }, res) => {
    if (!id) {
      res.status(400).json({});
    }

    try {
      await db.Unit.destroy({
        where: { id },
      });
      return res.status(200).json({});
    } catch (err) {
      return res.status(500).json(err);
    }
  });
