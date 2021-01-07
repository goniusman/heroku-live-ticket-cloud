const validate = comment => {
    let error = {}

    if(!comment.comment){
        error.comment = "Please Provide Comment"
    }
    return{
        error,
        isValid: Object.keys(error).length === 0
    }
}


module.exports = validate