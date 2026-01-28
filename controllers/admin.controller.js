const AdminModel = require('../models/Admin.model')
const { bcryptCompare, bcryptPashash } = require('../utils/bcrypt.util')
const { createToken } = require('../utils/jwt.util')

const adminLogin = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email , password are required",
      });
    }

    const admin = await AdminModel.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "admin not found",
      });
    }
    const isMatchPassword = await bcryptCompare(password, admin.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        succss: false,
        message: "Password do not match",
      });
    }
    const token = createToken({ adminId: admin._id });
    res.cookie('token', token, {
      secure: process.env.NODE_ENV == 'production' ? true : false,
      httpOnly: true,
      maxAge: process.env.COOKIE_EXPIER * 24 * 60 * 60 * 1000,
      sameSite: 'Lax'
    })
    res.status(200).json({
      success: true,
      message: `Welcome  ${admin.username} you login successfully`,
      result: {
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};
const profile = async (req, res, next) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        error: 'Unazorication'
      })
    }
    res.status(200).json({
      success: true,
      data: req.admin
    })
  } catch (error) {
    next(error)
  }
}
const logout = async (req, res, next) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        error: 'Unzorication'
      })
    }
    res.clearCookie("token", {
      secure: process.env.NODE_ENV == "production" ? true : false,
      httpOnly: true,
      sameSite: 'Strict'
    })
    res.status(200).json({
      success: true,
      message: `Admin are logout successfully`
    })
  } catch (error) {
    next(error)
  }
}

const signup = async (req, res, next) => {
  try {
    // Safety check: if body is missing, return error instead of crashing
    if (!req.body) {
      return res.status(400).json({ success: false, message: "No data provided" });
    }
    const { email, username, password, role } = req.body;
    if (!email || !password || !username || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, username, password, and role are all required",
      });
    }

    const hashedPassword = await bcryptPashash(password); 

    const newSignup = await AdminModel.create({
      email,
      username,
      password: hashedPassword,
      role
    });

    newSignup.password = undefined;

    res.status(201).json({
      success: true,
      data: newSignup,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { adminLogin, profile, logout, signup };