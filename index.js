import dotenv from 'dotenv';
import connectDB from './db.config.js';
import { app } from './app.js';
import cron from 'node-cron';
import { updateOrder } from './controllers/order.controller.js';

dotenv.config({
    path: './.env'
});

connectDB()
.then(()=>{
    //error comes before app.listen;
    app.on("error", (error) =>{
        console.log("ERR: ",error);
        throw error
    })

    app.listen(process.env.PORT || 8000,()=>{
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connected failed !!! ",err);
})


cron.schedule('0 */5 * * * *', () => {
    updateOrder();
});
