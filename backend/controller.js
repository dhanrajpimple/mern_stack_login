// userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./model'); 
const signUp = async (req, res) => {
  try {
    const { fullName, mobileNumber, password, email } = req.body;

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      mobileNumber,
      password: hashedPassword,
      email,
    });

    
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Error in signUp:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    const user = await User.findOne({ email });


    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const passwordMatch = await bcrypt.compare(password, user.password);

   
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign({ userId: user._id }, 'dhanraj', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signUp, login };
