
Appointment = require('../models/schema');
Slot = require('../models/slotschema');
const slotController = {
  all (req, res) {
    
      Slot.find({ "slot_date": { "$eq": req.body.slot_date } })
          .exec((err, slots) =>
           res.json({
           	status : "true",
		   data : slots
           })
           )
    
  }
};



module.exports = slotController;