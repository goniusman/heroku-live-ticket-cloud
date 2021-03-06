const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    topic: {
        type: String
    },
    severity: {
        type: String
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    comments: []
}, {timestamps: true})

const Ticket = mongoose.model('Ticket', ticketSchema)
module.exports = Ticket