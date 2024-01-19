const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});


module.exports = mongoose.models.User || mongoose.model("User", userSchema);
