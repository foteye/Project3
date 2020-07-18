const router = require("express").Router();
const db = require("../../models");
const { uuid } = require("uuidv4");
const bcrypt = require("bcryptjs");

module.exports = router
  .get("/", async (req, res) => {
    try {
      const models = await db.Model.findAll();
      return res.status(200).json(models);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post(
    "/create",
    async ({ body: { name, faction, costPerModel, unitLimit } }, res) => {
      if (!name || !faction || !costPerModel || !unitLimit) {
        return res.status(400).json({});
      }

      try {
        const model = await db.Model.create({
          id: uuid(),
          name,
          faction,
          costPerModel,
          unitLimit,
        });
        return res.status(200).json(model);
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
      const query = `SELECT * FROM Model WHERE \`${field}\` = '${value}' ORDER BY name`;
      const models = await db.sequelize.query(query, {
        model: db.Model,
        mapToModel: true,
      });
      return res.status(200).json(models);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .delete("/delete", async ({ body: { id } }, res) => {
    if (!id) {
      res.status(400).json({});
    }

    try {
      await db.Model.destroy({
        where: { id },
      });
      return res.status(200).json({});
    } catch (err) {
      return res.status(500).json(err);
    }
  });
