import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required
    },
    age: {
        type: Number,
        required
    }
});

module.exports = mongoose.model('Test', testSchema);
