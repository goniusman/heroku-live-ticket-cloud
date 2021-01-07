const Ticket = require('../model/Ticket')
const {serverError, resourceError} = require('../utils/error')
const ticketValidator = require('../validator/ticketValidator')

module.exports = {

    create(req, res) {
        let { name, email, topic, severity, subject, description, image, comments } = req.body
        let validate = ticketValidator({ name, email, subject })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {

            let ticket = new Ticket({
                                    name, 
                                    email, 
                                    topic, 
                                    severity, 
                                    subject, 
                                    description, 
                                    image, 
                                    comments
                                })

          ticket.save()
                .then(ticket => {
                    res.status(201).json({
                        message: 'Ticket Created Successfully',
                        ticket
                    })
                })
                .catch(error => serverError(res, error))
  
        }
    },

    getAll(req, res) {
        // for specific user
        // let {_id} = req.ticket
        // ticket.find({author: _id})
        Ticket.find()
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
    },

    getSingleTicket(req, res) {
        let { ticketId } = req.params
        Ticket.findById(ticketId)
            .then(ticket => {
                if (!ticket) {
                    res.status(200).json({
                        message: 'No Ticket Found'
                    })
                } else {
                    res.status(200).json(ticket)
                }
            })
            .catch(error => serverError(res, error))
    },

    update(req, res) {
        let { ticketId } = req.params
        Ticket.findOneAndUpdate({ _id: ticketId }, { $set: req.body }, {new: true})
            .then(result => { 
                res.status(200).json({
                    message: 'Updated Successfully',
                    ticket: result
                })
            })
            .catch(error => serverError(res, error))
    },

    remove(req, res) {
        let { ticketId } = req.params
        Ticket.findOneAndDelete({ _id: ticketId })
            .then(result => {
                res.status(200).json({
                    message: 'Deleted Successfully',
                    ...result._doc
                })
            })
            .catch(error => serverError(res, error))
    }

}