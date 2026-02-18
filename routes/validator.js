const {body, validationResult} = require('express-validator');
const carValidationRules = () => {
    return [
        body('year').isInt({gt:1500}).withMessage('Must be a valid year.'),
        body('odometer').isInt({min:0}).withMessage('Odometer Must be a number greater than zero.'),
        body('horsepower').isInt({gt:0}).withMessage('HorsePower Must be greater than zero.'),
        body('transmision').toLowerCase().isIn(["manual","automatic"]).withMessage('Wrong type of transmision.')
    ]
};

const categoriesValidationRules = () => {
    return [
        body('name').toLowerCase().isIn(["economy", "suv", "luxury", "van", "sport"]).withMessage('Must be a valid category.'),
        body('pricePerDay').isInt({gt:0}).withMessage('Price per day Must be greater than zero.'),
        body('pricePerHour').isInt({gt:0}).withMessage('Price per hour Must be greater than zero.'),
        body('depositAmount').isInt({min:0}).withMessage('Deposit must be at least zero.')
    ]
};

const locationValidationRules = () => {
    return [
        body('city').toLowerCase().isIn(["new york", "chicago", "salt lake", "provo"]).withMessage('Must be a city with in the range.'),
        body('country').toLowerCase().isIn(['usa']).withMessage('Not a valid country.')
    ]
};

const reservationValidationRules = () => {
    return [
        body('startDate').isDate({format:'YYYY-MM-DD'}).withMessage('SD Must be a valid date with format YYYY-MM-DD.'),
        body('endDate').isDate({format:'YYYY-MM-DD'}).withMessage('ED Must be a valid date with format YYYY-MM-DD.'),
        body('status').toLowerCase().isIn(['reserved', 'active', 'completed', 'cancelled']).withMessage('Not a valid status.'),
        body('totalPrice').isInt({gt:0}).withMessage('total price must be greater than zero.')
    ]
};


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map( err => extractedErrors.push( {[err.param] : err.msg}));
    return res.status(422).json( {errors : extractedErrors, });
};

module.exports = {
    carValidationRules,
    categoriesValidationRules,
    locationValidationRules,
    reservationValidationRules,
    validate
}