
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;


var appointmentidSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var appointmentid = mongoose.model('appointmentid', appointmentidSchema);
const appointmentSchema = new Schema({
  id: String,
  name: String,
  email: String,
  phone: Number,
  gender:String,
  age:String,
  slots: String,
  slot_from: String,
  slot_to: String,
  slot_date: String,
  created_at: Date


});

appointmentSchema.pre('save', function(next) {
    var doc = this;
    appointmentid.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} },{upsert: true , new: true}, function(error, appointmentid)   {
        if(error)
            return next(error);
        doc.id = appointmentid.seq;
        next();
    });
});


var Appointment = module.exports = mongoose.model('appointment', appointmentSchema);
