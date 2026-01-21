import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => v && v.length > 5,
        message: "Address must be at least 6 characters long",
      },
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => validator.isMobilePhone(v + "", "any", { strictMode: false }),
        message: "Invalid phone number",
      },
    },
    role: { type: String, enum: ["customer", "admin", "seller", "deliveryperson"], default: "customer" },
    cartdata:{ type: Object, default: {} }
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  this.email = this.email.toLowerCase();
  if (this.isModified("password")) {
    try {
      const bcrypt = await import("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      const salt = crypto.randomBytes(16).toString("hex");
      const derivedKey = crypto
        .pbkdf2Sync(this.password, salt, 310000, 32, "sha256")
        .toString("hex");
      this.password = `${salt}:${derivedKey}`;
    }
  }
  next();
});


const User = mongoose.model("User", userSchema);
export default User;