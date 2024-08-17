const express = require('express')
const router = express.Router()

const patientHandler = require('../router_handler/patient_handler')

router.post('/register', patientHandler.register)

router.post('/login', patientHandler.login)

router.get('/patient/profile:id', patientHandler.showprofile)
router.put('/patient/update', patientHandler.updateprofile)

module.exports = router
