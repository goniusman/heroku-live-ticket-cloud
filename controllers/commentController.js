const Comment = require('../model/Comment')
const Ticket = require('../model/Ticket')
const {serverError, resourceError} = require('../utils/error')
const commentValidator = require('../validator/commentValidator')


module.exports = {

    create(req, res) {
    
        let { comment } = req.body
        let validate = commentValidator({ comment })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {

            let comments = new Comment({comment, user:comment._id })
            comments.save()
                .then(comment => {
                 
                    let  updatedTicket  = {
                        "_id":  "5ff6b7956c2c03461cf6899b",
                        "comments": [],
                        "name": "Osman goni",
                        "email": "goniusman600@gmail.com",
                        "topic": "test purpose",
                        "severity": "High definition",
                        "subject": "whyspace is so crazt, test purpose",
                        "description": "this is description for tesiting purpose next, deal",
                        "image": "",
                        "createdAt": {
                            "$date": "2021-01-07T07:26:13.817Z"
                        },
                        "updatedAt": {
                            "$date": "2021-01-07T07:26:13.817Z"
                        },
                        "__v": 0
                    }

                    console.log(updatedTicket)

                    // let updatedTicket = { ...req.user._doc }
                    
                    updatedTicket.comments.unshift(comment._id)
                    
                    Ticket.findByIdAndUpdate(updatedTicket._id, { $set: updatedTicket }, { new: true })
                        .then(result => {
                            res.status(201).json({
                                message: 'Comment Created Successfully',
                                ...comments._doc,
                                ticket: result
                            })
                        })
                        .catch(error => serverError(res, error))
                })
                .catch(error => serverError(res, error))
        }
    },

    getAll(req, res) {
        // for specific user
        let {_id} = req.params
       Comment.find({user: _id})
        // Comment.find()
            .then(tickets => {
                if (tickets.length === 0) {
                    res.status(200).json({
                        message: 'No Ticket Found'
                    })
                } else {
                    res.status(200).json(tickets)
                }
            })
            .catch(error => serverError(res, error))
    }

}