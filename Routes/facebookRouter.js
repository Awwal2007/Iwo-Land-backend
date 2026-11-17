const express = require('express');
const facebookRouter = express.Router();

const {createFacebookUrl, deleteFacebookUrlById, getAllFacebookUrl} = require('../Controllers/facebookController')
const isLoggedIn = require('../Middlewares/isLoggedIn')

facebookRouter.post('/', isLoggedIn, createFacebookUrl);
facebookRouter.delete('/:id', isLoggedIn, deleteFacebookUrlById);
facebookRouter.get('/', getAllFacebookUrl);

module.exports = facebookRouter


