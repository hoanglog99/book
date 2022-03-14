const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
exports.connectDB =async () => {
    try {
         await mongoose.connect('mongodb://localhost:27017/books', {
            useNewUrlParser: true
        })
        console.log('connect success!');
    }
    catch (err) {
        console.log('connectDB false!');
    }

}

