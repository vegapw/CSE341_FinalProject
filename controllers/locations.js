const { response } = require('express');
const mongoDB = require('../data/database');
const {ObjectId} = require('mongodb');
const Location = require('../models/Location');


const getAll = async (req, res) => {
  //#swagger.tags=['Locations']
  try {
    const result = await Location.find();
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json('Locations not found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }

};

const getLocationById = async (req, res) => {
  //#swagger.tags=['Locations']
  try {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid Location id.');
    }
    const result = await Location.findById(req.params.id).lean();
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json('Location not found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internar Server Error');
  }
};

const createLocation = async (req, res) => {
  //#swagger.tags=['Locations']
  const location = {
    name : req.body.name,
    address : req.body.address ,
    city : req.body.city,
    country : req.body.country,
    coordinates : req.body.coordinates
  };
  try {
    const result = await Location.create(req.body);
    res.status(201).json(result._id);
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
};

const updateLocation = async (req, res) => {
  //#swagger.tags=['Locations']
  try {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid Location id.');
    } else {
        const location = {
            name : req.body.name,
            address : req.body.address ,
            city : req.body.city,
            country : req.body.country,
            coordinates : req.body.coordinates
        };
       let result = await Location.findById(req.params.id).lean();
       if (!result) {
        return res.status(404).json('Location not found');
       }
       result = await Location.findOneAndUpdate({_id: req.params.id}, req.body, {
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

const deleteLocation = async (req, res) => {
  //#swagger.tags=['Locations']
  try {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid location id.');
    }
    let result = await Location.findById(req.params.id).lean();
    if (!result) {
        return res.status(404).json('Location not found');
    }
    result = await Location.findByIdAndDelete({ _id : req.params.id});
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = {
  getAll,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
}