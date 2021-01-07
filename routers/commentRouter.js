const router = require('express').Router()
const { create, getAll } = require('../controllers/commentController')
// const authenticate = require('../authenticket')


router.post('/:tickeId', create)
router.get('/:tickeId', getAll)

module.exports = router