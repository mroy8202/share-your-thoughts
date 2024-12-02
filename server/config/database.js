import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("DB connection successful"))
        .catch((error) => {
            console.log("DB connection failed");
            console.error(error);
            process.exit(1);
        });
};
