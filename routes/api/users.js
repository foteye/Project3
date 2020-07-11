const router = require("express").Router();
const db = require("../../models");
const { uuid } = require("uuidv4");
const bcrypt = require("bcryptjs");

module.exports = router
  .post("/authenticate", async ({ body: { email, password } }, res) => {
    if (!email || !password) {
      return res.status(400).json({});
    }

    try {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      return res.status(200).json(user.validPassword(password));
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post(
    "/signup",
    async ({ body: { email, password, firstName, lastName } }, res) => {
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({});
      }

      try {
        const user = await db.User.create({
          id: uuid(),
          email,
          password: bcrypt.hash(password),
          firstName,
          lastName,
        });
        return res.status(200).json(user);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  );
