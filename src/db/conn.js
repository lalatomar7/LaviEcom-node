// const mongodb =  require('mongodb');
// const mclient = mongodb.MongoClient

// mclient.connect('mongodb://localhost:27017/mystore', {
//         useCreateIndex: true,
//     useNewUrlparser:true,
//     useUnifiedTopology:true,
//     useFindAndModify: false
// }).then(()=>{
//     console.log("Connection successfully");
// }).catch(()=>{
//     console.log("Connection Faild");
// });

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/cruddb", {
    useNewUrlParser: "true", 
    useUnifiedTopology: true
})
mongoose.connection.on("error", err => {
    console.log("err", err)
    process.exit(0);
})
mongoose.connection.on("connected", (err, res) => {
    console.log("Mongoose is connected")
})


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/mystore', {
//     useCreateIndex: true,
//     useNewUrlparser:true,
//     useUnifiedTopology:true,
//     useFindAndModify: false
// }).then(()=>{
//     console.log("Connection successfully");
//     console.log(mongoose.connection.find());
// }).catch(()=>{
//     console.log("Connection Faild");
// });