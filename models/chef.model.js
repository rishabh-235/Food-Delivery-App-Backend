import mongoose, { Schema } from "mongoose";

const chefSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

export const Chef = mongoose.model("Chef", chefSchema);