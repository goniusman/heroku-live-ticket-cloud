const validator = require('validator')


const validate = ticket => {
    let error = {}

    if(!ticket.name){
        error.name = "Please Provide Your Name"
    }
    if(!ticket.email){
        error.email = "Please Provide Your Email"
    }else if(!validator.isEmail(ticket.email)){
        error.email = "Please Provide Valide Email"
    }

    if(!ticket.subject){
        error.subject = "Please Provide Your subject"
    }else if(ticket.subject.length < 10){
        error.subject = "subject is too short"
    }

    // if(!ticket.description){
    //     error.description = "Please Provide Your description"
    // }else if(ticket.description.length < 20){
    //     error.description = "description is too short"
    // }
  

    return{
        error,
        isValid: Object.keys(error).length === 0
    }
}


module.exports = validate