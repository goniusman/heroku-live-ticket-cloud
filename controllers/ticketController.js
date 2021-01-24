const Ticket = require('../model/Ticket')
const nodemailer = require("nodemailer")
const {serverError, resourceError} = require('../utils/error')
const ticketValidator = require('../validator/ticketValidator')

module.exports = {

    create(req, res) {
        // console.log(res)
        let { name, email, topic, severity, subject, description, image, comments } = req.body
        let validate = ticketValidator({ name, email, subject, topic })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
            
        } else {

            let ticket = new Ticket({name,email,topic,severity,subject, description: description ,image,comments})

            ticket.save()
                  .then(ticket => {
                    const output = `
                    <p>You have a new ticket from user</p>
                    <h3>Ticket Details</h3>
                    <ul>  
                      <li>Name: ${ticket.name}</li>
                      <li>Company: ${ticket.topic}</li>
                      <li>Email: ${ticket.severity}</li>
                      <li>Phone: ${ticket.subject}</li>
                    
                    </ul>
                    <h3>Message</h3>
                    <p>${ticket.description}</p>
                  `;
                   
                     let transporter = nodemailer.createTransport({
                        //  service: 'gmail',
                        //  auth: {
                        //      user: 'goniusman400@gmail.com',
                        //      pass: '44447770osman'
                        //  }
                        host: "smtp.gmail.com",
                        port: 587,
                        domain: 'gmail.com',
                        authentication: 'plain',
                        enable_starttls_auto: true,
                        openssl_verify_mode : 'none' ,
                        // secure: false, // true for 465, false for other ports
                    //    requireTLS: false,

                        auth: {
                          user: 'goniusman400@gmail.com', // generated ethereal user
                          pass: '44447770osmanGONE', // generated ethereal password
                        },
                        // tls:{
                        //   rejectUnauthorized:false
                        // }

                      });
                    
                      // send mail with defined transport object
                      let mailOptions ={
                        from: '"Nodemailer For Ticket" <goniusman400@gmail.com>', // sender address
                        to: `${ticket.email}`, // list of receivers
                        subject: ticket.subject, // Subject line
                        // text: 'Hello world?', // plain text body
                        html: output // html body
                      };
                
                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);   
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                  
                        res.render('contact', {msg:'Email has been sent'});
                    });
                      res.status(201).json({
                            //   message: 'Ticket Created Successfully'
                              ...ticket._doc,
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
        Ticket.findById(ticketId)
            .then(ticktet => {  
                // console.log(res)
                
                ticktet.comments.unshift(req.body)
                Ticket.findOneAndUpdate({ _id: ticketId }, { $set: ticktet }, {new: true})
                    .then(result => { 
                        res.status(200).json({
                            message: 'Updated Successfully',
                            ...result._doc
                        }) 
                        // console.log(result)
                    })
                    .catch(error => serverError(res, error))
            })
            .catch(error => serverError(res, error))
       
        
    },

    remove(req, res) {
        let { ticketId } = req.params
        Ticket.findOneAndDelete({ _id: ticketId })
            .then(result => {
                res.status(200).json({
                    // message: 'Deleted Successfully',
                    ...result._doc
                })
            })
            .catch(error => serverError(res, error))
    },

    updateSolved(req, res){
        let { ticketId } = req.params
        Ticket.findById(ticketId)
        .then(ticket => {  
                ticket.isComplete = !ticket.isComplete
                Ticket.findOneAndUpdate({ _id: ticketId }, { $set: ticket }, {new: true})
                    .then(result => { 
                        res.status(200).json({
                            message: 'Updated Successfully Solved',
                            ...result._doc
                        }) 
                    })
                    .catch(error => serverError(res, error))
            })
            .catch(error => serverError(res, error))
    },

    imageUpload (req, res)  {
       const {ticketId } = req.params
            if (req.files === null) {
              return res.status(400).json({ msg: 'No file uploaded' });
            }
       
            const file = req.files.file;

            file.mv(`${__dirname}/../client/public/uploads/${file.name}`, err => {
              if (err) {
                console.error(err);
                return res.status(500).send(err);
              }

              Ticket.findById(ticketId)
                .then(ticket => {  
                        ticket.image = `/uploads/${file.name}`
                        Ticket.findOneAndUpdate({ _id: ticketId }, { $set: ticket }, {new: true})
                            .then(result => { 
                                res.status(200).json({
                                    message: 'Image Updated Successfully',
                                    ...result._doc
                                }) 
                            })
                            .catch(error => serverError(res, error))
                    })
                .catch(error => serverError(res, error))



              // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
            });
          
    }



}