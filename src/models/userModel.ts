import mongoose, { Schema } from "mongoose";

export interface Message extends Document{
    content: string,
    createdAt: Date
}

const messageSchema: Schema<Message> = new Schema ({

    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    isVerified: Boolean,
    verifyToken: string,
    verifyTokenExpiry: Date,
    isAcceptingMessage: Boolean,
    messages: Message[]
}

const userSchema: Schema<User> = new Schema({

    username:{
        type: String,
        unique: [true, "Username must be Unique"],
        required: [true, "User must have a Username"]
    },
    email: {
        type: String,
        unique: [true, "User must have a Unique email"],
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean
    },
    verifyToken:{
        type: String
    },
    verifyTokenExpiry:{
        type: Date
    },
    isAcceptingMessage:{
        type: Boolean
    },
    messages: {
        type: [messageSchema]
    }
})

const user = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", userSchema))

export default user;

