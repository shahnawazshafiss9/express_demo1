import mongoose from "mongoose";
import 'dotenv/config';
 
const connectDB = async () => {
    try {
        const DB_OPTIONS = {
            dbName:'schooldb'
        };
        await mongoose.connect(process.env.DATABASE_URL, DB_OPTIONS);
        console.log('DB Connect Successfully');
    } catch (err) {
        console.log(err);
    }
}
export default connectDB;
