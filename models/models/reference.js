var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
    	type: String,
    	required: true
    },
    description: {
    	type: String,
    	required: true
    },
    chapters: [{
    	type: Schema.Types.ObjectId,
    	ref: 'Chapter'
    }]
});

var Reference = module.exports = mongoose.model('Reference', schema);
