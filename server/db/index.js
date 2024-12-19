import mongoose from "mongoose";

const connectToDB = async function (){
  
try{
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthdash')
  console.log(`Connected to MongoDB`);
}catch(e){
  console.error("Failed to connect: ",e);
  process.exit(1);
}
}

export default connectToDB;