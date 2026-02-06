import mongoose from "mongoose";

interface connectionObject{
    isConnected?: number
}

const connection: connectionObject = {}

async function connectDb(): Promise<void>{

    if(connection.isConnected === 1){
        console.log("Database Already Connected");
        return
    }

    try {
        const res = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`MongoDb connection successfull!! Host: ${res.connection.host}`)
        connection.isConnected = res.connection.readyState;
    } catch (error: any) {
        console.log("Database Connection Failed", error);
        process.exit(1);
    }
}

export default connectDb