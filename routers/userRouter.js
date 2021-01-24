const router = require('express').Router()

const {login, register, allUser, imageUpload} = require('../controllers/userController')

// Registration Route
router.post('/register', register)
// Login Route
router.post('/login', login)
// all user route
router.get('/all', allUser)
router.put('/:userId', imageUpload)

module.exports = router