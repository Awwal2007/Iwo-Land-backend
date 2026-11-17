const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const mongoDbUri = process.env.Mongo_Uri
let connectionPromise = null;

const connectToDb = async ()=>{
    if (mongoose.connection.readyState === 1) {
        return;
    }
    if (!mongoDbUri) {
        throw new Error("Mongo_Uri environment variable is not defined");
    }
    try {
        if (!connectionPromise) {
            connectionPromise = mongoose.connect(mongoDbUri);
        }
        const connected = await connectionPromise;
        if(connected){
            console.log("mongodb connected");      
        }
    } catch (error) {
        connectionPromise = null;
        console.log(error);
        throw error;
    }
}

module.exports = connectToDb

