const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    _id: String,
    array: [Number]
}, {
    versionKey: false
});

module.exports = mongoose.model('ArraySchema', NoteSchema,'array_sample');