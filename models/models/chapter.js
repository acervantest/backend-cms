var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Reference = require('./reference');

var schema = new Schema({
    title: {
    	type: String,
    	required: true
    },
    reference: {
    	type: Schema.Types.ObjectId,
    	ref: 'Reference'
    }
});

schema.post('remove', (chapter) => {
  Reference.findById(chapter.reference, (err, reference) => {
    reference.chapters.pull(chapter);
    reference.save();
  })
})

var Chapter = module.exports = mongoose.model('Chapter', schema);
