import mongoose, {Schema} from "mongoose";

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Burger", "Pizza", "Drinks", "French Fries", "Veggies"],
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    deliveryTime: {
      type: Number,
      required: true,
      default: 30, // Default delivery time in minutes
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;