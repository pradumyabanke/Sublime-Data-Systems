const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({

    id: { type: Number, required: true },
    first_name: { type: String, required: true, },
    last_name: { type: String, required: true, },
    city: { type: String, required: true },
    company: { type: String, required: true },
    
}, { timestamps: true });

module.exports = mongoose.model("Customer", CustomerSchema)