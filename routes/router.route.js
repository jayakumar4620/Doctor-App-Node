var  express = require('express');

const router = express.Router();

const appointmentController = require('../controller/appointment')
const slotController = require('../controller/timeslot')

router.post('/appointments', appointmentController.all);

router.post('/retrieveSlots', slotController.all);

router.post('/appointmentCreate', appointmentController.create_appointment);

router.post('/slotCreate', appointmentController.create_slot);


module.exports = router;
