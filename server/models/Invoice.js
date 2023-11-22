const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required!']
    },
    description: {
        type: String,
    },
    date_created: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Invoices', InvoiceSchema);
