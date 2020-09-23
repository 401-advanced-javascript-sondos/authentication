'use strict';

const express = require('express');
const exrouter = express.Router();
const userSchema = require('./models/usersModel');
const bearer = require('./middleware/bearer');
const permissions = require('./middleware/authorize');


exrouter.get('/secret', bearer, (req, res) => res.json(req.user));

exrouter.get('/read', bearer, permissions('read'), (req, res) => {
    res.status(200).send('Allowed user to read');

});

exrouter.post('/add', bearer, permissions('create'), (req, res) => {
    res.status(200).send('Allowed  to add');

});

exrouter.put('/change', bearer, permissions('update'), (req, res) => {
    res.status(200).send('Allowed  to update');

});

exrouter.delete('/remove', bearer, permissions('delete'), (req, res) => {
    res.status(200).send('Allowed  to remove');

});

module.exports = exrouter;
