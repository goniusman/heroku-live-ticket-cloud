const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

const User = require('../model/User')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')

const {serverError, resourceError} = require('../utils/error')

// login controller
module.exports = {
    
    register(req, res) {
        let { name, email,type, password, confirmPassword } = req.body
        let validate = registerValidator({ name, email,type, password, confirmPassword })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, 'Email Already Exist')
                    }

                    bcrypt.hash(password, 11, (err, hash) => {
                        if (err) {
                            return resourceError(res, 'Server Error Occurred')
                        }

                        let user = new User({
                            name,
                            email,
                            type,
                            image: '',
                            password: hash
                        })

                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'User Created Successfully',
                                    user
                                })
                            })
                            .catch(error => serverError(res, error))
                    })
                })
                .catch(error => serverError(res, error))
        }
    },

    login(req, res) {
        let { email, password } = req.body
        let validate = loginValidator({ email, password })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }
        
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found')
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }
                    if (!result) {
                        return resourceError(res, 'Password Doesn\'t Match')
                    }

                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        type: user.type
                    }, 'SECRET', {expiresIn: '2h'})

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })

                })
            })
            .catch(error => serverError(res, error))

        // Generate Token and Response Back
    },

    allUser(req, res) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error => serverError(res, error))
    },
 
    imageUpload(req, res){
        const {userId } = req.params
        if (req.files === null) {
          return res.status(400).json({ msg: 'No file uploaded' });
        }
    
        const file = req.files.file;

        file.mv(`${__dirname}/../client/public/user/uploads/${file.name}`, err => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }

          User.findById(userId)
            .then(user => {  
                    user.image = `/user/uploads/${file.name}`
                    User.findOneAndUpdate({ _id: userId }, { $set: user }, {new: true})
                        .then(result => { 
                            let token = jwt.sign({
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                                image: user.image,
                                type: user.type
                            }, 'SECRET', {expiresIn: '2h'})
        
                            res.status(200).json({
                                message: 'Updated Successful',
                                token: `Bearer ${token}`
                            })
                        })
                        .catch(error => serverError(res, error))
                })
            .catch(error => serverError(res, error))



          // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
        });
      
    }
}