     const express = require('express');
     const router = express.Router();
const { getAll, getSingle, createBook, updateBook, deleteBook } = require('../controllers/books');

const { isAuthenticated } = require('../middleware/authenticate');
     

/**
 * @swagger
 * components:
 * schemas:
 *   Book:
 *     type: object
 * required:
 *       - title
 *       - author
 *      - genre
 *     - publicationYear
 *    - isbn
 *    - pages
 *   - availableCopies
 *    properties:
 *      title:
 *       type: string
 *     description: The book's title
 * author:
 *       type: string
 *     description: The book's author
 *   genre:
 *     type: string
 *    description: The book's genre
 * publicationYear:
 *      type: number
 *     description: The year the book was published
 *   isbn: string
 *     description: The book's ISBN number
 *   pages:
 *    type: number
 *   description: The number of pages in the book
 * availableCopies:
 *    type: number
 *   description: The number of available copies in the library
 * example:
 *    title: "The Great Gatsby"
 *   author: "F. Scott Fitzgerald"
 *   genre: "Fiction"
 *   publicationYear: 1925
 *  isbn: "9780743273565"
 *  pages: 180
 * availableCopies: 3
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *    tags: [Books]
 *    responses:
 *      200:
 *       description: A list of books
 *      content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *          $ref: '#/components/schemas/Book'
 *  post:
 *    summary: Create a new book
 *   tags: [Books] 
 *   requestBody:
 *    required: true
 *   content:
 *     application/json:
 *      schema:
 *      $ref: '#/components/schemas/Book'
 *   responses:
 *     201:
 *     description: The book was successfully created
 *   content:
 *    application/json:
 *     schema:
 *     $ref: '#/components/schemas/Book'
 *    400:
 *      description: Bad request
 *    500:
 *     description: Internal server error
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *    summary: Get a book by ID
 *   tags: [Books]
 *  parameters:
 *    - in: path
 *     name: id
 *    required: true
 *    schema:
 *     type: string
 *   description: The book ID
 *  responses:
 *    200:
 *    description: The book description by ID
 *   content:
 *    application/json:
 *    schema:
 *     $ref: '#/components/schemas/Book'
 *   404:
 *   description: Book not found
 *  500:
 *  description: Internal server error
 * put:
 *  summary: Update a book by ID
 * tags: [Books]
 * parameters:
 *   - in: path
 *   name: id
 *  required: true
 *  schema:
 *     type: string
 *   description: The book ID
 * requestBody:
 *  required: true
 * content:
 *   application/json:
 *   schema:
 *    $ref: '#/components/schemas/Book'
 * responses:
 *   200:
 *   description: The book was updated
 * content:
 *  application/json:
 *   schema:
 *   $ref: '#/components/schemas/Book'
 *  400:
 *  description: Bad request
 * 404:
 *  description: Book not found
 * 500:
 * description: Internal server error
 * delete:
 *  summary: Delete a book by ID
 * tags: [Books]
 * parameters:
 *   - in: path
 *   name: id
 * required: true
 * schema:
 *    type: string
 * description: The book ID
 * responses:
 *  200:
 *   description: The book was deleted
 *  404:
 * description: Book not found
 * 500:
 * description: Internal server error
 */


     router.get('/', getAll);          // Line 10 might be this POST line
     router.get('/:id', getSingle);
     router.post('/', createBook);     // If line 10 is POST, check if createBook is defined
     router.put('/:id',isAuthenticated, updateBook);
     router.delete('/:id',isAuthenticated, deleteBook);

     module.exports = router;
     