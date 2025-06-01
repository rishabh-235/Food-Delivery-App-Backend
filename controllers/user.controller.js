import User from "../models/user.model.js";
import { Analytics } from "../models/analytics.model.js";

const addUser = async (req, res) => {
  const { name, phone, deliveryAddress } = req.body;
  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      if (existingUser.name === name) {
        if (
          deliveryAddress &&
          existingUser.deliveryAddress !== deliveryAddress
        ) {
          existingUser.deliveryAddress = deliveryAddress;
          await existingUser.save();
        }
        return res.status(200).json(existingUser);
      }
      return res.status(400).json({
        message:
          "User with this phone number already exists with different details",
      });
    }
    const newUser = new User({ name, phone, deliveryAddress });
    await newUser.save();

    const analytics = await Analytics.findById('683b0fa6f1c4f9095a9d47ef');
    analytics.totalClients += 1;
    await analytics.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUser = async (req, res) => {
  const { phone } = req.body.phone;
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export { addUser, getUser };
