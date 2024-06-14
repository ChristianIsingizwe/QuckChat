import Joi from "joi";
import bcrypt, { genSalt } from "bcrypt";
import _ from "lodash";
import { User } from "../models/userModel.js";
import { createTokens } from "../tokens/createTokens.js";

// A joi schema for validating the users

const schema = Joi.object({
  username: Joi.string().min(1).max(255),
  email: Joi.string().email().min(3).max(255).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

// Function for registering the user in the database

export const registerUser = async (req, res) => {
  const data = _.pick(req.body, ["username", "email", "password"]);

  const result = schema.validate(data);

  if (result?.error)
    return res.status(400).json({ error: result.error.details[0].message });

  try {
    let user = await User.findOne({ email: data.email }).select(
      "username, password"
    );
    if (user) res.status(400).json({ error: "The user already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    user = new User({ ...data, password: hashedPassword });

    await user.save();

    const tokens = createTokens(user);

    res.status(201).json({ user, ...tokens });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for logging in the user

export const loginUser = async (req, res) => {
  const data = _.pick(req.body, ["email", "password"]);
  const result = schema.validate(data);

  if (result?.error)
    return res.status(400).json({ error: result.error.details[0].message });

  try {
    let user = User.findOne({ email: data.email }).select("username, email");
    if (!user) return res.status(400).json({ error: "The user doesn't exist" });

    const passwordCheck = bcrypt.compare(data.password, user.password);
    if (!passwordCheck)
      return res.status(400).json({ error: "Invalid password" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};

// Function for finding all the users

export const findUsers = async (req, res) => {
  const users = User.find().select("email");
  res.status(200).json(users);
};

// Function for finding a user using his id

export const findUser = async (req, res) => {
  const id = _.pick(req.params, ["id"]);

  const user = User.findById(id);
  if (!user) return res.status(400).json({ error: "The user doesn't exist" });
  res.status(200).json(user);
};

// Function for getting the profile of the user

export const getProfile = async (req, res) => {
  const userId = _.pick(req.params, ["id"]);

  const userProfile = await User.findById(userId).select("username, password");
  if (!userProfile)
    return res.status(404).json({ error: "User profile not found" });

  return res.status(200).json(userProfile);
};
