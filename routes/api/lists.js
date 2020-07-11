const router = require("express").Router();
const db = require("../../models");
const { uuid } = require("uuidv4");
const bcrypt = require("bcryptjs");

module.exports = router
  .post("/find", async ({ body: { field, value } }, res) => {
    if (!field || !value) {
      return res.status(400).json({});
    }

    try {
      const query = `SELECT * FROM List WHERE ${field} = ${value} ORDER BY name`;
      const lists = await db.sequelize.query(query, {
        model: db.List,
        mapToModel: true,
      });

      return res.status(200).json(lists);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post(
    "/create",
    async ({ body: { userId, name, faction, maxPoints } }, res) => {
      if (!name || !faction || !maxPoints) {
        res.status(400).json({});
      }

      try {
        const list = await db.List.create({
          id: uuid(),
          userId,
          name,
          faction,
          maxPoints,
        });

        return res.status(200).json(list);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  )
  .delete("/delete", async ({ body: { id } }, res) => {
    if (!id) {
      res.status(400).json({});
    }

    try {
      await db.List.destroy({
        where: { id },
      });
      return res.status(200).json({});
    } catch (err) {
      return res.status(500).json(err);
    }
  });
