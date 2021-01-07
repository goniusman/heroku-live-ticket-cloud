const mongoose = require('mongoose')

const Schema = mongoose.Schema



const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment

