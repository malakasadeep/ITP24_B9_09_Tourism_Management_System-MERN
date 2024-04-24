import PkgListning from "../models/pkglistning.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Hotel from "../models/Hotel.js"
import Vehicle from "../models/Vehicle.js"
import mongoose from "mongoose";

export const test = (req, res) => {
  res.json({
    message: "Api route is working",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.user.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          email: req.body.email,
          country: req.body.country,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can delete your own account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("Account has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUserPackages = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const packages = await PkgListning.find({ userRef: req.params.id });
      res.status(200).json(packages);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "you can only see your own packages"));
  }
};
export const getUserHotels = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const hotels = await Hotel.find({ userRef: req.params.id });
      res.status(200).json(hotels);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "you can only see your own hotels"));
  }
};
export const getUserVehicles = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const vehicles = await Vehicle.find({ userRef: req.params.id });
      res.status(200).json(vehicles);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "you can only see your own vehicles"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));
    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getUserSearch = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let usertype = req.query.type;
    if (usertype === undefined || usertype === "all") {
      usertype = { $in: ["Travel Service Providers", "Tourist", "Admin"] };
    }
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const users = await User.find({
      username: { $regex: searchTerm, $options: "i" },
      usertype,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//get all Users
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

//delete a user by id
export const deleteUserByid = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No User" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No User" });
  }

  res.status(200).json(user);
};
