import mongoose, { Schema } from "mongoose";

const tableSchema = new Schema(
  {
    capacity: {
      type: Number,
      required: true,
      default: 2,
    },
    name: {
      type: String,
      default: "Table",
    },
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
