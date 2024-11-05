import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://miltonsuarez25:tKBpadmJ1j4ospxf@offcorss.ajzu8.mongodb.net/?retryWrites=true&w=majority&appName=offcorss");
        console.log("Conectado correctamente");
    } catch (error) {
        console.log(error)
    }
}







