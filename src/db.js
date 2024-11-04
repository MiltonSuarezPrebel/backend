import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/dev_offcorss");
        console.log("Conectado correctamente");
    } catch (error) {
        console.log(error)
    }
}







