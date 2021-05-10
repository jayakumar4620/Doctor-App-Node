const  express = require('express');
const app = express();

var bodyParser = require('body-parser');
const mongoose = require('mongoose');
  var cors = require('cors');
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())
app.use(cors());
const index = require('./routes/router.route');
const api = require('./routes/router.route');

app.use(cors())
const uri = "mongodb+srv://doctorapp:doctorapp@cluster0.vnwg3.mongodb.net/assignmentdb?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/',api)
var port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("Running on port " + port);
});

module.exports = app;