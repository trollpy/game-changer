import { body } from 'express-validator';

export const validateRegistration = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

export const validateLogin = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required')
];

export const validateListing = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category')
    .isIn(['produce', 'livestock', 'tools', 'equipment'])
    .withMessage('Invalid category'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  body('unit').notEmpty().withMessage('Unit is required'),
  body('location.coordinates')
    .isArray({ min: 2, max: 2 })
    .withMessage('Location must be an array of [longitude, latitude]')
];

export const validateMarketPrice = [
  body('commodity').notEmpty().withMessage('Commodity is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('unit').notEmpty().withMessage('Unit is required'),
  body('market').notEmpty().withMessage('Market is required'),
  body('region').notEmpty().withMessage('Region is required')
];