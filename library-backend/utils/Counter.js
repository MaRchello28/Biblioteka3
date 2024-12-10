const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        required: true,
    },
});

const Counter = mongoose.model('Counter', counterSchema);

async function getNextSequence(name) {
    try {
        const counter = await Counter.findOneAndUpdate(
            { id: name },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        return counter.seq;
    } catch (error) {
        throw new Error('Unable to generate sequence.');
    }
}

module.exports = {
    Counter,
    getNextSequence,
};
