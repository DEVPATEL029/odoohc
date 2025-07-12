import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { validateEmail, validatePassword, validateUsername } from '../utils/validation.js';

export const register = async (req, res) => {
  const { first_name, last_name, email, password, created_by } = req.body;

  if (!validateUsername(first_name, last_name)) {
    return res.status(400).json({ error: 'Invalid username format.' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Invalid password format.' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const usernameExists = await User.findOne({ first_name, last_name });
    if (usernameExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "This email's user already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      created_by
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Failed to register user!' });
  }
};

//login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist with this email." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    // ✅ If using JWT, you can generate a token here
    // For example:
    // import jwt from 'jsonwebtoken';
    // const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      // token
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Login failed due to server error.' });
  }
};