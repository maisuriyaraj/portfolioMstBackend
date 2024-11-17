import mongoose from "mongoose";


async function connectDatabase(){
    try {
        const dbResponse = await mongoose.connect(process.env.MONGO_CONNECTION);
        if(dbResponse){
            console.log("Mongo Connected Success fully ! 🗿🗿 , Now Focused !" , dbResponse.connection.host);
        }
    } catch (error) {
        console.log("Database Connection Erorr : " , error);
    }
    
}

export default connectDatabase;