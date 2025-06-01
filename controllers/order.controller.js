import Order from '../models/order.model.js';
import Item from '../models/item.model.js';
import Table from '../models/table.model.js';
import { Analytics } from '../models/analytics.model.js';
import { Chef } from '../models/chef.model.js';

const addOrder = async (req, res, next) => {
    try {
        const {user, numberofPeople, cookingInstructions, mode, allocatedTables} = req.body;
        let {items} = req.body;

        //find the items in the database
        const itemDetails = await Item.find({_id: {$in: items}});
        let totalAmount = itemDetails.reduce((total, item) => total + item.rate, 0);
        totalAmount += 5 // taxe charges

        if(mode === "Takeaway") {
            totalAmount += 50; // add a fixed charge for takeaway orders
        }

        // items should be in array of id and quantity
        items = items.map(item => {
            return {item: item._id, quantity: item.quantity, itemName: item.itemName};
        });

        // Caluclate total time to make the order
        const totalTimeToMake = itemDetails.reduce((total, item) => total + item.deliveryTime, 0);

        const newOrder = new Order({
            items,
            totalAmount,
            user: user._id,
            numberofPeople,
            cookingInstructions,
            tables: allocatedTables,
            totalTimeToMake,
            mode
        });
        await newOrder.save();

        // update the table status to occupied
        for (const table of allocatedTables) {
            await Table.findByIdAndUpdate(table, { status: "occupied" });
        }
        req.body.orderId = newOrder._id;

        // update the analytics
        const analytics = await Analytics.findById('683b0fa6f1c4f9095a9d47ef');
        analytics.totalOrders += 1;
        analytics.totalRevenue += totalAmount;
        await analytics.save();
        next();
    } catch (error) {
        console.error("Error adding order: ", error);
        res.status(500).json({message: "Error adding order", error: error.message});
    }
};

const getOrders = async (_, res) => {
    try {
        // fetch all orders
        const orders = await Order.find().populate('items');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: "Error fetching orders", error: error.message});
    }
};

const updateOrder = async () => {
    // retrive all the pending orders and check if their remaining time is 0 or negative then update the status to served
    try {
        const pendingOrders = await Order.find({status: "pending"});
        for (const order of pendingOrders) {
            const remainingTime = order.totalTimeToMake - Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000);
            if (remainingTime <= 0) {
                const chefId = order.chef;
                const table = order.tables;

                // deallocating the chef from the order
                const chef = await Chef.findById(chefId);
                chef.orders = chef.orders.filter(o => o.toString() !== order._id.toString());
                await chef.save();

                // deallocating the tables from the order
                if(table[0]){
                    const tableDetails = await Table.findById(table[0]);
                    tableDetails.status = "available";
                    await tableDetails.save();
                }

                if(table[1]){
                    const tableDetails = await Table.findById(table[1]);
                    tableDetails.status = "available";
                    await tableDetails.save();
                }

                // update the order status to served
                await Order.findByIdAndUpdate(order._id, {status: "served"});
            }
        }
    } catch (error) {
        console.error("Error updating order: ", error);
    }
};

export {addOrder, getOrders, updateOrder};