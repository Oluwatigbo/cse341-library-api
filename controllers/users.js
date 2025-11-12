const e = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');  // For validation

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  membershipId: Joi.string().required(),
});

const getAll = async (req, res) => {
    //#swagger.tags = ['Users'];
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users'];
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
        const users = await result.toArray();
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users'];
    const { error } = userValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = {
        name: req.body.name,
        email: req.body.email,
        membershipId: req.body.membershipId
    };
    try {
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(201).json(user);
        } else {
            res.status(500).json({ message: 'Error creating user' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users'];
    const { error } = userValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            name: req.body.name,
            email: req.body.email,
            membershipId: req.body.membershipId
        };
        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users'];
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
