const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const BorrrowBookSchema = new Schema({
    Id: String,
    borrrowedDate: String,
    returnDate: String,
    name: String,
    status: String
});

module.exports = mongoose.model('borrowBook', BorrrowBookSchema);