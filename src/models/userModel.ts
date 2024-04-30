import mongoose from "mongoose";

const roleIds = {
  admin: 1,
  employee: 2,
  teamLead: 3,
  jrDeveloper: 4,
  srDeveloper: 5
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "employee",
    enum: ["admin", "employee", "teamLead", "jrDeveloper", "srDeveloper"]
  },
  roleId: {
    type: Number,
    default: 2, 
    enum: Object.values(roleIds)
   
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
