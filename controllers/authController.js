import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  const { name, email, password, gender } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ name, email, password: hashedPassword, gender });
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, "adsf3e534tfr453645gfsdv334363fdefgdsxf", { expiresIn: '10s' });
  res.json({ token });
};

export const logout = async (req, res) => {
  res.json({ message: 'Logout successful' });
};

export const profile = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json({ name: user.name, email: user.email, gender: user.gender });
};
