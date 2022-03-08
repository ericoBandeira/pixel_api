const User = require("../model/User");
const { hashPassword } = require("../password");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  try {
    const { registration, password } = req.body;

    if (!registration || !password) {
      return res.status(400).json({ error: "missing login information" });
    }

    const user = await User.findOne({ where: { registration } });

    if (!user) {
      return res
        .status(401)
        .json({ error: "invalid registration or password" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, registration },
        process.env.SECRET,
        {
          expiresIn: "30m",
        }
      );

      return res.status(200).json({ auth: true, token });
    }

    return res.status(401).json({ error: "invalid credentials" });
  } catch (err) {
    console.error(`could not perform login: ${err}`);
    return res.status(500).json({ error: `could not login user: ${err}` });
  }
}

async function createUser(req, res) {
  if (!req.body.registration || !req.body.password) {
    return res.status(400).send({
      error: "missing some information to register user",
    });
  }

  try {
    const password = req.body.password;

    const userInfo = {
      password: await hashPassword(password),
      registration: req.body.registration,
    };

    const newUser = await User.create({
      registration: userInfo.registration,
      password: userInfo.password,
    });

    if (!newUser) {
      return res.status(500).send({ error: "could not create user" });
    }

    // Finds user in database
    const createdUser = await User.findByPk(newUser.id, {
      attributes: ["id", "registration"],
    });

    return res.status(200).send(createdUser);
  } catch (error) {
    console.log(`could not create user: ${error}`);
    return res
      .status(500)
      .json({ error: "internal error during user register" });
  }
}

async function findPixelByUser(req, res) {
  const { registration } = req.query;

  if (!registration) {
    return res.status(400).json({ error: "missing required information" });
  }

  const user = await User.findOne({ where: { registration } });
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  const pixel = await user.getPixel();
  if (!pixel) {
    return res.status(404).json({ error: "user doesn't have any pixel" });
  }

  return res.status(200).json(pixel);
}

module.exports = { loginUser, createUser, findPixelByUser };
