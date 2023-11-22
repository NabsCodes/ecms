//creating an instance of mongo
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

let Mongo = "";
const port = process.env.PORT || process.env.LocalPort;
{process.env.LocalPort === port ? Mongo = process.env.mongoURL : Mongo = process.env.mongoURLProduction}


//creating an instance of the mongodb connection
mongoose.connect(Mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log("MongoDb Connected Successfully!!!"))
    .catch(err => console.log(err));

module.exports = mongoose;