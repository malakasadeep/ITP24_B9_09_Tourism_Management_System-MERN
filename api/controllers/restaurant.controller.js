// Importing the necessary modules
import  Restaurant from '../models/restaurant.model.js'; // Model for Restaurant data schema
import {errorHandler} from '../utils/error.js'; // Utility for handling errors

// Function to create a new restaurant entry
export const createRestaurant = async (req, res, next) => {
    try {
        // Extracting restaurant data from the request body
        const { ownerName, restaurantName, location, description, image } = req.body;

        // Validating required fields
        if (!ownerName || !restaurantName || !location) {
            return next(errorHandler(400, 'Please fill out all the fields'));
        }

        // Creating a new Restaurant instance with provided data
        const newRestaurant = await Restaurant({
            ownerName,
            restaurantName,
            location,
            description,
            image
        });

        // Saving the new restaurant to the database
        const savedRestaurant = await newRestaurant.save();

        // Sending a success response with the saved restaurant data
        res.status(201).json({ message: 'Restaurant created', savedRestaurant });
    } catch (error) {
        // Forwarding the error to the error handling middleware
        next(error);
    }
};

// Function to retrieve restaurants based on query parameters
export const getRestaurant = async (req, res, next) => {
    try {
        // Determining sort direction from the query parameter
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const query = {};

        // Filtering by restaurant name or ID if provided in the query
        if (req.query.restaurantName) {
            query.restaurantName = req.query.restaurantName;
        }
        if (req.query.restaurantId) {
            query._id = req.query.restaurantId;
        }

        // Finding and sorting restaurants based on the query and sort direction
        const restaurant = await Restaurant.find(query).sort({ updatedAt: sortDirection });

        // Sending the found restaurants in the response
        res.status(200).json(restaurant);
    } catch (error) {
        // Forwarding the error to the error handling middleware
        next(error);
    }
};

// Function to update an existing restaurant's information
export const updateRestaurant = async (req, res, next) => {
    try {
        // Extracting updated data from the request body
        const { ownerName, restaurantName, location, description, image } = req.body;

        // Updating the restaurant identified by req.params.id with the new data
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, {
            $set: {
                ownerName,
                restaurantName,
                location,
                description,
                image
            }
        }, { new: true }); // Option to return the updated document

        // Sending a success response with the updated restaurant data
        res.status(200).json({ message: 'updated successfully', updatedRestaurant });
    } catch (error) {
        // Forwarding the error to the error handling middleware
        next(error);
    }
};

// Function to delete a restaurant by its ID
export const deleteRestaurant = async (req, res, next) => {
    try {
        // Deleting the restaurant identified by req.params.id
        await Restaurant.findByIdAndDelete(req.params.id);

        // Sending a success response indicating the restaurant has been deleted
        res.status(200).json({ message: 'restaurant has been deleted' });
    } catch (error) {
        // Forwarding the error to the error handling middleware
        next(error);
    }
};

// Exporting the functions to be used in the application routes
