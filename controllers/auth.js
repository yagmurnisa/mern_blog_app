const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req,res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'E-mail does not exist'  });
      } 
      else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({  msg: 'Password is incorrect'  });
        }
        else {
            const payload = {
                user: {
                    id: user.id,
                },
            };
            user.password = undefined;
            jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 }, // 1 hour expire time
            (error, token) => {
                if (error) throw error;
                res.status(200).json({ token, user });
            }
            );
        }}
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};

const register = async (req,res) => {
    const { name, email, password, password2 } = req.body;
    console.log(req.body);
    try {
      let checkUser = await User.findOne({ email });
      if (checkUser) {
        return res
          .status(400)
          .json({  msg: 'This e-mail is taken' });
      }
      ////
      const image= '';
      const description='';
      var user = new User({
        name,
        email,
        password,
        image,
        description
      });
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      console.log(user);
      const payload = {
        user: {
          id: user.id,
        },
      };
      user.password= undefined;
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 }, // 1 hour expire time
        (error, token) => {
            if (error) throw error;
            res.status(200).json({ token, user });
        }
      );
    console.log(res.data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('An error occured');
    }
  };
  const getCurrentUser = async (req,res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

module.exports = {login, register, getCurrentUser};