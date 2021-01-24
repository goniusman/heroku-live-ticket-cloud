const { findById } = require('../model/Comment')
const Comment = require('../model/Comment')
const Ticket = require('../model/Ticket')
const {serverError, resourceError} = require('../utils/error')
const commentValidator = require('../validator/commentValidator')


module.exports = {
 
    create(req, res) {
        let { comment } = req.body
        let validate = commentValidator({ comment })
        // let userId = req.params.ticketId
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            let comments = new Comment({comment, user:comment._id })
            comments.save()
            .then(comment => {
                let {ticket} = req.params
                Ticket.findOne(ticket)
                    .then(tic => {
                        tic.comments.unshift(comment._id)
                        Ticket.findByIdAndUpdate(tic._id, { $set: tic})
                            .then(result => {
                                res.status(201).json({
                                    message: 'Comment Created Successfully',
                                    // ...trans._doc,
                                    // user: result
                                    result
                                    
                                })
                            })
                            .catch(error => serverError(res, error))
                    })
                    .catch(error => serverError(res, error))
            })
            .catch(error => serverError(res, error))
        }
    },

    getAll(req, res) {
        // for specific user
        let _id = req.params.ticketId
        console.log(_id)
       Comment.find({user: _id})
        // Comment.find()
            .then(comments => {
                if (comments.length === 0) {
                    res.status(200).json({
                        message: 'No Comment Found'
                    })
                } else {
                    res.status(200).json(comments)
                }
            })
            .catch(error => serverError(res, error))
    },

    getSingleComment(req, res) {
        let { commentId } = req.params
        Comment.findById(commentId)
            .then(comment => {
                if (!comment) {
                    res.status(200).json({
                        message: 'No Comment Found'
                    })
                } else {
                    res.status(200).json(comment)
                }
            })
            .catch(error => serverError(res, error))
    },

    update(req, res) {
        let { commentId } = req.params
        Comment.findOneAndUpdate({ _id: commentId }, { $set: req.body }, {new: true})
            .then(result => { 
                res.status(200).json({
                    message: 'Updated Successfully',
                    // comment: result
                })
            })
            .catch(error => serverError(res, error))
    },

    remove(req, res) {
        let { commentId } = req.params
        Comment.findOneAndDelete({ _id: commentId })
            .then(result => {
                res.status(200).json({
                    message: 'Deleted Successfully',
                    // ...result._doc
                })
            })
            .catch(error => serverError(res, error))
    }

}