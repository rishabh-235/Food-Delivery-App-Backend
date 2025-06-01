import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        itemName: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "served"],
      default: "pending",
    },
    chef: {
      type: Schema.Types.ObjectId,
      ref: "Chef",
    },
    tables: [
      {
        type: Schema.Types.ObjectId,
        ref: "Table",
        required: true,
      },
    ],
    totalTimeToMake: {
      type: Number,
      required: true,
      default: 0,
    },
    mode: {
      type: String,
      enum: ["Dine In", "Take Away"],
      default: "Dine In",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    numberofPeople: {
      type: Number,
      required: true,
    },
    cookingInstructions: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
