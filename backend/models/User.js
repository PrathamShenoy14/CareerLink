import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String, // Only for normal login
  googleId: String, // Only for Google login
});

const User = mongoose.model("User",UserSchema);

export default User;