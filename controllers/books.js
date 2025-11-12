const e = require('express');
const mongodb = require('../data/database');  // Assuming you have this setup; if not, switch to Mongoose
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');  // Add Joi for validation

const bookValidationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  publicationYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
  isbn: Joi.string().required(),
  pages: Joi.number().integer().min(1).required(),
  availableCopies: Joi.number().integer().min(0).required(),
});

const getAll = async (req, res) => {
    //#swagger.tags = ['Books'];  // Changed to 'Books'
    try {
        const result = await mongodb.getDatabase().db().collection('books').find();
        const books = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Books'];  // Changed to 'Books'
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
        const books = await result.toArray();
        if (books.length === 0) return res.status(404).json({ message: 'Book not found' });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createBook = async (req, res) => {  // Renamed from createUser
    //#swagger.tags = ['Books'];  // Changed to 'Books'
    const { error } = bookValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publicationYear: req.body.publicationYear,
        isbn: req.body.isbn,
        pages: req.body.pages,
        availableCopies: req.body.availableCopies
    };
    try {
        const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
        if (response.acknowledged) {  // Fixed typo
            res.status(201).json(book);  // Return created book
        } else {
            res.status(500).json({ message: 'Error creating book' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateBook = async (req, res) => {  // Renamed from updateUser
    //#swagger.tags = ['Books'];  // Changed to 'Books'
    const { error } = bookValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const bookId = new ObjectId(req.params.id);
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear,
            isbn: req.body.isbn,
            pages: req.body.pages,
            availableCopies: req.body.availableCopies
        };
        const response = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId }, book);  // Fixed _Id to _id
        if (response.modifiedCount > 0) {
            res.status(200).json(book);  // Return updated book
        } else {
            res.status(404).json({ message: 'Book not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteBook = async (req, res) => {  // Renamed from deleteUser
    //#swagger.tags = ['Books'];  // Changed to 'Books'
    try {
        const bookId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createBook,  // Renamed
    updateBook,  // Renamed
    deleteBook   // Renamed
};
