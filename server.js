var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require("path");
app.use(express.static(path.join(__dirname, "./static")));

let mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

app.use(express.static( __dirname + '/beltExam1Angular/dist' ));

// ==== NEW MONGOOSE CODE! =======
mongoose.connect('mongodb://localhost/beltExam1');
mongoose.Promise = global.Promise;

let PetSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: [true, "Pet already exists!"], uniqueCaseInsensitive: true, minlength: [3, "Pet name needs to be greater than 3 characters!"]},
    type: {type: String, required: true, minlength: [3, "Pet type needs to be greater than 3 characters!"]},
    description: {type: String, required: true, minlength: [3, "Pet description needs to be greater than 3 characters!"]},
    skill1: {type: String, required: false},
    skill2: {type: String, required: false},
    skill3: {type: String, required: false},
    likes: {type: Number, default: 0},
}, {timestamps: true});

PetSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.'});

mongoose.model('Pet',PetSchema); 
let Pet = mongoose.model('Pet')
// ==============================

app.get('/pets', function(req, res){
    Pet.find({}, function(err, data){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", data}) //this returns an object because it includes a message.
        }
     }).sort([['type', 1]]) //SORTING
});

app.post('/pets', function(req, res){
    console.log("BODY", req.body)
    let pet = new Pet(req.body);
    console.log(pet)
    pet.save(req.body, function (err, savedPet){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", savedPet})
            console.log("SAVEDPET:", savedPet)
        }
     })
});

app.get('/pets/:id', function(req, res){
    Pet.findOne({_id: req.params.id}, function(err, onePet){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
           res.json({message: "Success", data: onePet})
           console.log("PET", onePet)
        }
     })
})

app.put("/pets/:id", function(req, res) {
    var pet = {};
    pet.name = req.body.name;
    pet.type = req.body.type;
    pet.description = req.body.description;
    pet.skill1 = req.body.skill1;
    pet.skill2 = req.body.skill2;
    pet.skill3 = req.body.skill3;
    pet.likes = req.body.likes;

    console.log("Likes in the Server!", req.body.likes)

    Pet.update({_id: req.params.id}, pet, { runValidators: true}, function (err, results) { // don't forget to add { runValidators: true}
        if(err){
            console.log("Returned error", err);
            res.json({message: "Update error", error: err})
        }
        else {
            console.log('successfully updated the pet', results);
            res.json({message: "Update success", results});
        }
    });

});

app.delete("/pets/:id", function(req, res) {
    console.log('initiating removal');
    Pet.remove({_id: req.params.id},function(err, data) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log("delete error ",err);
          res.send(err);
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully deleted the pet',data);
          res.json({message: "Delete success"});
        }
    });
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./beltExam1Angular/dist/index.html"))
  });

app.listen(8000, function() {
    console.log("Beltexam1 listening on port 8000");
});