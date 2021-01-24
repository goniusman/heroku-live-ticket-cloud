const router = require('express').Router()
const { create, getAll } = require('../controllers/commentController')
// const authenticate = require('../authenticket')


router.post('/:ticketId', create)
router.get('/:ticketId', getAll)

module.exports = router