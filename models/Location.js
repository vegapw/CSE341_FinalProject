const mongodb = require('mongoose');

const LocationSchema = new mongodb.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    coordinates:{
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
    }
  }
});


module.exports = mongodb.model('Location', LocationSchema);