import Joi from "joi";
import bcrypt from "bcrypt";
import _ from "lodash";
import User from "../models/userModel";


// A joi schema for validating the users
const schema = Joi.object({
  username: Joi.string().alphanum().min(1).max(255).required(),
  email: Joi.string().email().min(3).max(255).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  repeat_password: Joi.ref(password),
});

// Function for registering the user in the database
const registerUser = async (req, res) => {
  const data = _.pick(req.body, ["username", "email", "password"]);

  const result = schema.validate(data);

  if (result?.error)
    return res.status(400).json({ error: result.error.details[0].message });

  try {
    let user = await User.findOne({ email: data.email });
    if (user) res.status(400).json({ error: "The user already exist" });

    user = new User({ ...data });

    await user.save();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
