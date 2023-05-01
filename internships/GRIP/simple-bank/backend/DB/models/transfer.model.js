const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    fromUserId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    toUserId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

const transferModel = mongoose.model("transfer", transferSchema);

module.exports = transferModel;