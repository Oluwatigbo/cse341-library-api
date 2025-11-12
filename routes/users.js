const express = require('express');
const router = express.Router();
const { getAll, getSingle, createUser, updateUser, deleteUser } = require('../controllers/users');

/**
 * @swagger
 * components:
 *   schemas:
 *    User:
 *    type: object
 *    required:
 *     - name
 *    - email
 *    - membershipId
 *   properties:
 *    name:
 *    type: string
 *   description: The user's name
 * email:
 *    type: string
 *  description: The user's email
 * membershipId:
 *   type: string
 * description: The user's membership ID
 * example:
 *   name: "Duru David"
 * email: "durudavid@gmail.com"
 *   membershipId: "MEM001"
 */

/**
 * @swagger
 * /users: 
 *  get:
 *  summary: Retrieve a list of users
 * tags: [Users]
 * responses:
 *    200:
 *    description: A list of users
 *   content:
 *     application/json:
 *      schema:
 *      type: array
 *       items:
 *        $ref: '#/components/schemas/User'
 * post:
 *  summary: Create a new user
 * tags: [Users]
 * requestBody:
 *  required: true
 * content:
 *   application/json:
 *   schema:
 *   $ref: '#/components/schemas/User'
 * responses:
 *   201:
 *  description: The user was successfully created
 *  content:
 *   application/json:
 *    schema:
 *   $ref: '#/components/schemas/User'
 * 400:
 * description: Bad request
 * 500:
 * description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 * get:
 * summary: Get a user by ID
 * tags: [Users]
 * parameters:
 * - in: path
 *  name: id
 * required: true   
 * schema:
 *  type: string
 * description: The user ID
 * responses:
 *  200:
 * description: The user description by ID
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 404:
 * description: User not found
 * put:
 * summary: Update a user by ID
 * tags: [Users]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The user ID
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * responses:
 * 200:
 * description: The user was updated
 * content:
 * application/json:
 *  schema:
 * $ref: '#/components/schemas/User'
 * 400:
 * description: Bad request
 * 404:
 * description: User not found
 * 500:
 * description: Internal server error
 * delete:
 * summary: Delete a user by ID
 * tags: [Users]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The user ID
 * responses:
 * 200:
 * description: The user was deleted
 * 500:
 * description: Internal server error
 */



router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;