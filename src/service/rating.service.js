const ratingRepository = require('../repository/rating.repository');
const rating = require('../models/rating.model');


async function createRating(req, res) {
    try{
        const { comment, id, rating, id_customer, id_teacher } = req.body

        const saved = await ratingRepository.create(req.body)
        console.log(saved)

        res.status(201).send({});

    } catch(error) {
        console.log(error);
        
        res.status(400).send(error);
    }
}

// para componente de listagem
async function getRatings(req, res) {

    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 25; 
    const startIndex = (page - 1) * limit; 
    const endIndex = page * limit;
    
    const id_teacher = req.params.id

    
    const total = await rating.countDocuments();

    query = rating.find({ id_teacher: id_teacher }).skip(startIndex).limit(limit);

    const results = await query;

    const pagination = {};

    if (endIndex < total) {
    pagination.next = {
        page: page + 1,
        limit
    };
    }

    if (startIndex > 0) {
    pagination.prev = {
        page: page - 1,
        limit
    };
    }

    const advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
    }

    res.status(200).json(advancedResults);
};

// retorno da média
async function getAverageRating( req, res ) {

    const id_teacher = req.params.id

    try {
        
        const results = await rating.aggregate([
            
            { $match: {
                id_teacher : id_teacher 
            }},
            { $group: {
                _id: '$id_teacher',
                ratingAvg: { $avg: '$rating'}
            }}
        ]);

        res.status(200).json(results)

    } catch (error) {
        console.log(error);
        
        res.status(400).send(error);
    } 
};


module.exports = { createRating, getRatings, getAverageRating }