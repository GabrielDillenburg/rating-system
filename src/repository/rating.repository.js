const Rating = require("../models/rating.model");

async function create(data) {
  try {
    let rating = await Rating.create(data);
    return rating;
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    let rating = await Rating.findById(id);
    return rating;
  } catch (error) {
    throw error;
  }
}

async function getExternalId(id) {
  try {
    let rating = await Rating.findOne({ external_id: id });
    return rating;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getById,
  create,
  getExternalId,
};