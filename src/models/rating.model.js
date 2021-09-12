const mongoose = require('mongoose')

var RatingSchema = new mongoose.Schema(
    {
      id_customer: String,
      id_teacher: String,
      comment: String,
      rating: Number,
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("ratings", RatingSchema);

 


