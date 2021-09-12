var express = require("express");
var mongoose = require("mongoose");
require('dotenv').config();

const ratingRouter = require('./src/routes/rating.route');

const main = express();

main.use(express.json());
main.use(express.urlencoded({ extended: false }));

const uri =  process.env.uri

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });


  main.use("/v1/rating", ratingRouter)

  main.listen(process.env.PORT || 5000, process.env.IP, function () {
    console.log(
      "Servidor ON em: ",
      process.env.PORT || 5000,
  
    );
  });