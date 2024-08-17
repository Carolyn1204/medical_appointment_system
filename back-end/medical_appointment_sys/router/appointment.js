const express = require('express')
const router = express.Router()

const patientHandler = require('../router_handler/appointment_handler')

router.get('/patient/appointment:id', patientHandler.show_appointment)
router.post('/patient/addApp', patientHandler.addAppointment)
router.put('/patient/updateStatus', patientHandler.updateStatus)
router.get('/doctor/appointment:id', patientHandler.doctor_appointment)




module.exports = router