const express = require("express");
const router = express.Router();

const { createRating, getRatings, getAverageRating } = require("../service/rating.service");

router.post('/', createRating);

router.get('/:id', getRatings); //lista os dados brutos (componente de listagem)


router.get('/average-rating/:id', getAverageRating); // retorna a média


module.exports = router;