import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    //cors origin is use to specify url from which the request we are getting.
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//handling the data getting form the frontend while requesting. the data can be in any form.
//.json is to allowing the json file at the backed.
app.use(express.json({ limit: "16kb" }));

import adminRouter from "./routes/admin.route.js";
import orderRouter from "./routes/order.route.js";
import userRouter from "./routes/user.route.js";

//using the order router
app.use("/api/v1/order", orderRouter);

//using the admin router
app.use("/api/v1/admin", adminRouter);

//using the user router
app.use("/api/v1/user", userRouter);

export { app };
