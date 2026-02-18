const mongodb = require('mongoose');

const reservationSchema = new mongodb.Schema({
  userId: {
    type: mongodb.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carId: {
    type: mongodb.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  pickupLocationId: {
    type: mongodb.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  dropoffLocationId: {
    type: mongodb.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['reserved', 'active', 'completed', 'cancelled'],
    default: 'reserved'
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongodb.model('Reservation', reservationSchema);