import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async()=>{
    try{
        const conn= await mongoose.connect(process.env.Mongo_URL);
        console.log(`Connected to MongoDB${conn.connection.host}`);
    }   
    catch(err){
        console.log(`Error in MongoDB ${err}`.bgRed.white);
    }
}

export default connectDB;