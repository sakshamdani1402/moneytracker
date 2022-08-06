
const mongoose= require('mongoose');
const mongoURI= "mongodb+srv://saksham:14022001@cluster0.vfjz8.mongodb.net/expenseTracker?retryWrites=true&w=majority";

const connnectToMongo=()=>{
    mongoose.connect(mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
const db = mongoose.connection;
//db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports= connnectToMongo;