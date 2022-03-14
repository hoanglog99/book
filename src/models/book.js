const mongoose = require("mongoose")
const Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
const BookSchema = new Schema({
    Id: String,
    Name: String,
    RatingDist1: String,
    pagesNumber: Number,
    RatingDist4: String,
    RatingDistTotal: String,
    PublishYear: Number,
    PublishMonth: Number,
    PublishDay: Number,
    Publisher: String,
    CountsOfReview: Number,
    Language: String,
    Authors: String,
    Rating: SchemaTypes.Double,
    RatingDist2: String,
    RatingDist3: String,
    RatingDist5: String,
    ISBN: String
});

module.exports = mongoose.model('Book', BookSchema);