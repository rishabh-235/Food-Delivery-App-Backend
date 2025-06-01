import { Chef } from "../models/chef.model.js";
import Order from "../models/order.model.js";

export const allocateChef = async (req, res) => {
  try {
    const { orderId} = req.body;

    const chefs = await Chef.find().sort({ orders: 1 }).exec();
    const minOrders = chefs[0].orders.length;
    const allSame = chefs.every((chef) => chef.orders.length === minOrders);
    let chef;

    if (allSame && chefs[0].orders.length > 0) {

      let min = Number.MAX_VALUE;

      for (let i = 0; i < chefs.length; i++) {

        const orders = await Order.find({ _id: { $in: chefs[i].orders } }).sort({ createdAt: 1 }).exec();

        const firstOrder = orders[0];

        // Calculate remaining time in minutes
        const totalTimeToMake = firstOrder.totalTimeToMake;
        const elapsedTimeMin = (Date.now() - firstOrder.createdAt.getTime()) / (60 * 1000);
        const OrderRemainingTime = totalTimeToMake - elapsedTimeMin;

        const totalTime = 0;
        for (let j = 1; j < orders.length; j++) {
          totalTime += orders[j].totalTimeToMake;
        }

        const totalRemainingTime = totalTime + OrderRemainingTime;

        if (totalRemainingTime < min) {
          min = totalRemainingTime;
          chef = chefs[i];
        }
      }
    } 
    else chef = chefs[0];

    // allocate the order to the chef
    chef.orders.push(orderId);
    await chef.save();

    const order = await Order.findByIdAndUpdate(orderId, { chef: chef._id }, { new: true });

    res.status(200).json({ message: "Order Placed successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error allocating chef", error: error.message });
  }
};

export const getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json(chefs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chefs", error: error.message });
  }
};