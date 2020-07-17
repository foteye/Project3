const router = require("express").Router();
const db = require("../../models");
const { uuid } = require("uuidv4");
const bcrypt = require("bcryptjs");

module.exports = router
  .get("/:listId", async ({ params: { listId } }, res) => {
    if (!listId) {
      return res.status(400).json({});
    }

    try {
      const M2MQuery = `SELECT u.* FROM unit u INNER JOIN M2MListUnit m2m ON m2m.unit = u.id AND m2m.list = '${listId}'`;
      const M2MLists = await db.sequelize.query(M2MQuery, {
        model: db.M2MListUnit,
        mapToModel: true,
      });

      return res.status(200).json(M2MLists);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post("/createOne", async ({ body: { list, unit, qty } }, res) => {
    if (!list || !unit) {
      return res.status(400).json({});
    }

    try {
      await db.M2MListUnit.create({
        list,
        unit,
        qty,
      });
      return res.status(200).json({});
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post("/deleteOne", async ({ body: { list, unit } }, res) => {
    if (!list || !unit) {
      return res.status(400).json({});
    }

    try {
      await db.M2MListUnit.destroy({
        where: {
          list,
          unit,
        },
      });
      return res.status(200).json({});
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .delete("/deleteAll:listId", async ({ params: { listId } }, res) => {
    if (!listId) {
      return res.status(400).json({});
    }

    try {
      const M2MQuery = `SELECT * FROM List l LEFT JOIN M2MListUnit m ON m.list = l.id WHERE m.list = '${listId}'`;
      const M2MLists = await db.M2MListUnit.destroy({
        where: { list: listId },
      });

      return res.status(200).json(units);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
