import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandeler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "Working test route" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandeler(403, "Not allowed to update"));
  }

  const updates = { ...req.body };
  // console.log(updates);
  
  if (updates.password) {
    if(updates.password === ' '){
      return next(errorHandeler(400, "Password could not be blank"));
    }
    if (updates.password.length < 6) {
      return next(errorHandeler(400, "Password must be at least 6 characters"));
    }
    updates.password = bcryptjs.hashSync(updates.password, 10);
  }

  if (req.file) {
    updates.profilePic = { url: req.file.path, filename: req.file.filename };
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: updates }, { new: true });
    if (!updatedUser) {
      return next(errorHandeler(404, "User not found"));
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ ...rest, token: req.user.token });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) =>{
 if(req.user.id != req.params.userId){
  return next(errorHandeler(403, 'you are not allowed to delete'));
 }
 try{
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
 }catch(error){
  next(error);
 }
};

export const signout = (req, res, next) =>{
  try{
    res.clearCookie('access_token').status(200).json('user has been signed out');
  }catch(error){
    next(error);
  }
}

export const getUsers = async(req, res, next) => {
  if(!req.user.Admin){
    return next(errorHandeler(403, 'You are not allowed to see'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    const users = await User.find()
    .sort({createdAt: sortDirection})
    .skip(startIndex)
    .limit(limit);

    const usersWithoutPass = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await User.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth - 1,
      now.getDate
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      users: usersWithoutPass,
      totalUsers,
      lastMonthUsers,
    });
    
  } catch (error) {
    next(error);
  }
}