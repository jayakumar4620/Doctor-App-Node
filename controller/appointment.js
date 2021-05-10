Appointment = require('../models/schema');
Slot = require('../models/slotschema');


const appointmentController = {
  all(req, res) {

Appointment.find({ "slot_date": { "$eq": req.body.slot_date } })
          .exec((err, appointments) =>
           res.json({
             status : "true",
           data : appointments
           })
           )

  },

  create_slot(req, res) {

Slot.find({ slot_from: { "$eq": req.body.slot_from },slot_date: { "$eq": req.body.slot_date } }, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
      // res.json(docs)
      if(docs.length != 0){

        res.json({
                message: 'Already slot created in that time',
                status:"false"
            });
      }else{


Slot.find({ "slot_date": { "$eq": req.body.slot_date }}, function (err, docs) {
    if (err){
        console.log(err);
    }else{
var existsslots= docs;

var diff;
var interval = false;
for (var i = 0; i < existsslots.length; i++) {
 
 var t1 = req.body.slot_from.split(":")[0]*60 + req.body.slot_from.split(":")[1]*1;
  
 var t2 = existsslots[i].slot_from.split(":")[0]*60 + existsslots[i].slot_from.split(":")[1]*1;
  diff = t2 - t1;
if(Math.sign(diff) == -1){
if (diff > -30 ) {
interval= true

  break; 
}
}else{

if(diff < 30){
  interval= true
  break; 

}

}
 
 
}
if(interval ==true){
 res.json({
            message: 'Slot exists in beween interval.Please create duration of 30 mins',
             status:"false"
            });

}else{


  var requestBody = req.body;
    var newslot = new Slot({
      slot_from: requestBody.slot_from,
      slot_to: requestBody.slot_to,
      slot_date: requestBody.slot_date,  
      created_at: Date.now(),

    });
      newslot.save(function (err) {
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New slot created!',
                data: newslot,
                status:"true"
            });
    });



}


    }
});


      }
    }
});


  },

   create_appointment(req, res){


 Appointment.find({ "slots": { "$eq": req.body.slots }}, function (err, docs) {
    if (err){
        console.log(err);
    }else{

 if(docs.length != 0){

        res.json({
                message: 'Appointment booked in that slot',
                status:"false"
            });
      }
else{

 Slot.find({ "id": { "$eq": req.body.slots }}, function (err, docs) {
    if (err){
        console.log(err);
    }else{
  var requestBody = req.body;

var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      gender:requestBody.gender,
      age:requestBody.age,
      slots: docs[0].id,
      slot_from: docs[0].slot_from,
      slot_to: docs[0].slot_to,
      slot_date: docs[0].slot_date
    });
   
 newappointment.save(function (err) {
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New appointment created!',
                data: newappointment,
                status:"true"
            });
    });
    }



});

    }

  }

});
}


};


module.exports = appointmentController;