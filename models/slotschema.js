
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

  const slotSchema = new Schema ({
    slot_from: String,
    slot_to: String,
    slot_date: String,
    created_at: Date,
     id:  String
  });

slotSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} },{upsert: true , new: true}, function(error, counter)   {
        if(error)
            return next(error);
        doc.id = counter.seq;
        next();
    });
});


var Slot = module.exports = mongoose.model('slot', slotSchema);

