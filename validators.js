const { body } = require('express-validator');

const registerValidation = [
  // Password needs to be min 6 chars
  body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
];

const loginValidation = [
    // Password should not be empty and needs to be min 6 chars
    body('password').not().isEmpty().withMessage("Password is required.")
  ];

module.exports = { registerValidation, loginValidation };