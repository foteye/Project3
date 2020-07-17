const router = require("express").Router();
const db = require("../../models");
const { uuid } = require("uuidv4");
const bcrypt = require("bcryptjs");

const emailAlreadyExists = async (email) => {
  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    return user ? true : false;
  } catch (err) {
    return false;
  }
};

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
      if (user && user.validPassword(password)) {
        return res.status(200).json({
          firstName: user.firstName,
          id: user.id,
          authenticated: true,
        });
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (err) {
      return res.status(500).json({ message: err.toString() });
    }
  })
  .post(
    "/signup",
    async ({ body: { email, password, firstName, lastName } }, res) => {
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({}).statusText("Parameter missing!");
      }

      try {
        if ((await emailAlreadyExists(email)) === true) {
          throw new Error("Email already exists");
        }
        const hashedPW = bcrypt.hashSync(password, 10);
        const user = await db.User.create({
          id: uuid(),
          email,
          password: hashedPW,
          firstName,
          lastName,
        });

        return res.status(200).json({
          firstName: user.firstName,
          id: user.id,
          authenticated: true,
        });
      } catch (err) {
        return res.status(500).json({ message: err.toString() });
      }
    }
  );
