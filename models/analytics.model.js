import mongoose, {Schema} from 'mongoose';

const analyticsSchema = new Schema(
  {
    totalOrders: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    totalClients: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

export const Analytics = mongoose.model('Analytics', analyticsSchema);