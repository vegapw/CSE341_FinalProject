const { response } = require('express');
const mongoDB = require('../data/database');
const {ObjectId} = require('mongodb');
const Reservation = require('../models/Reservation');


const getAll = async (req, res) => {
  //#swagger.tags=['Reservations']
  try {
    const result = await Reservation.find();
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json('Reservations not found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }

};

const getReservationById = async (req, res) => {
  //#swagger.tags=['Reservations']
  try {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid Reservation id.');
    }
        const result = await Reservation.findById(req.params.id).lean();
        if (result) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
        } else {
          res.status(404).json('Reservation not found.');
        }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internar Server Error');
  }
};

const createReservation = async (req, res) => {
  //#swagger.tags=['Reservations']
  const reservation = {
    userId : req.body.userId,
    carId : req.body.carId,
    pickupLocationId : req.body.pickupLocationId,
    dropoffLocationId : req.body.dropoffLocationId,
    startDate : req.body.startDate,
    endDate : req.body.endDate,
    status : req.body.status,
    totalPrice : req.body.totalPrice
  };
  try {
    const result = await Reservation.create(req.body);
    res.status(201).json(result._id);
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
};

const updateReservation = async (req, res) => {
  //#swagger.tags=['Reservations']
  try {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid Reservation id.');
    } else {
        const reservation = {
            userId : req.body.userId,
            carId : req.body.carId,
            pickupLocationId : req.body.pickupLocationId,
            dropoffLocationId : req.body.dropoffLocationId,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            status : req.body.status,
            totalPrice : req.body.totalPrice
        };
        let result = await Reservation.findById(req.params.id).lean();
        if (!result) {
            return res.status(404).json('Reservation not found');
        }
       result = await Reservation.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
       });
       res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
};

const deleteReservation = async (req, res) => {
  //#swagger.tags=['Reservations']
  try {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid reservation id.');
    }
    let result = await Reservation.findById(req.params.id).lean();
    if (!result) {
        return res.status(404).json('Reservation not found');
    }
    result = await Reservation.findByIdAndDelete({ _id : req.params.id});
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = {
  getAll,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
}