const router = require('express').Router()
const { create, getAll, getSingleTicket, update,remove } = require('../controllers/ticketController')

// for authenticate user
// const authenticate = require('../authenticate')
// router.get('/', authenticate, getAll)
// router.post('/', authenticate, create)
// router.get('/:ticketId', authenticate, getSingleTicket)
// router.put('/:ticketId', authenticate, update)
// router.delete('/:ticketId', authenticate, remove)


router.get('/', getAll)
router.post('/', create)
router.get('/:ticketId', getSingleTicket)

router.put('/:ticketId', update)
router.delete('/:ticketId', remove)


module.exports = router