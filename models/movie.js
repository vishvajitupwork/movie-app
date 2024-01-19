const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    posterUrl: { type: String, required: true },
    publishYear: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


module.exports = mongoose.models.Movie || mongoose.model("Movie", movieSchema);
