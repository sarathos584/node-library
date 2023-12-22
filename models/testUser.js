import mongoose from "mongoose";

const testUserSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const TestUser = mongoose.model("TestUser", testUserSchema);

export default TestUser;
