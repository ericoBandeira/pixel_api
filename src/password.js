const bcrypt = require("bcrypt");

async function hashPassword(pass, saltRounds = 12) {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(pass, salt);
}

module.exports = { hashPassword };
