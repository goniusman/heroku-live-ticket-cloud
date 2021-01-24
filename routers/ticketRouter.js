const router = require('express').Router()
const { create, getAll, getSingleTicket, update,remove, updateSolved, imageUpload } = require('../controllers/ticketController')

// for authenticate user
const authenticate = require('../authenticate')

router.post('/', create)
router.post('/upload/:ticketId', imageUpload)

router.get('/', getAll)
router.get('/:ticketId', getSingleTicket)
router.put('/:ticketId', update)
router.put('/issuetoggle/:ticketId', updateSolved)
router.delete('/:ticketId', remove)


module.exports = router