const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.setPassword = async function (password) {
  try {
    this.password = await argon2.hash(password);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

userSchema.methods.validatePassword = async function (password) {
  try {
    return await argon2.verify(this.password, password);
  } catch (error) {
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
