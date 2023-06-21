const express = require('express');
const { Model } = require('mongoose');
const router = express.Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            console.log('Error fetch users: ', err);
            res.status(500).send('Error fetching items');
        });
});

router.post('/users', async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age
    });

    try {
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new: true};

        const result = await User.findByIdAndUpdate(id, updatedData, options);

        res.send(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id);
        res.send(`Document deleted`);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;