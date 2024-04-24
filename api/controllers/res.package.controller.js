// Importing necessary modules and utilities
import Package from '../models/res.package.model.js' // Model for package data schema
import {errorHandler} from '../utils/error.js' // Utility for handling errors

// Function to create a new package
 export const createPackage = async (req, res, next) => {
    try {
        // Extract package data from request body
        const { packageName, packageDetails, packagePrice, image } = req.body

        // Validate required fields are present
        if (!packageName || !packageDetails || !packagePrice) {
            return next(errorHandler(400, 'Please fill out all the fields'))
        }

        // Create a new Package instance with the provided data
        const newPackage = await Package({
            packageName,
            packageDetails,
            packagePrice,
            image
        })

        // Save the new package instance to the database
        const savedPackage = await newPackage.save()

        // Send a success response with the saved package data
        res.status(201).json({ message: 'package created', savedPackage })
    } catch (error) {
        // Forward the error to the next middleware
        next(error)
    }
}

// Function to retrieve packages based on query parameters
export const getPackage = async (req, res, next) => {
    try {
        // Determine sort direction based on query parameter
        const sortDirection = req.query.order === 'asc' ? 1 : -1

        // Construct query object based on request queries
        const query = {}
        if (req.query.packageName) {
            query.packageName = req.query.packageName
        }
        if (req.query.packageId) {
            query._id = req.query.packageId
        }

        // Find and sort packages based on the constructed query and sort direction
        const pkg = await Package.find(query).sort({ updatedAt: sortDirection })
        // Send the retrieved packages in the response
        res.status(200).json(pkg)
    } catch (error) {
        // Forward the error to the next middleware
        next(error)
    }
}

// Function to update package information
export const updatePackage = async (req, res, next) => {
    try {
        // Extract updated package data from request body
        const { packageName, packageDetails, packagePrice, image } = req.body

        // Update the package identified by req.params.id with the new data
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, {
            $set: {
                packageName,
                packageDetails,
                packagePrice,
                image
            }
        }, { new: true }) // Return the updated document

        // Send a success response with the updated package data
        res.status(200).json({ message: 'updated successfully', updatedPackage })
    } catch (error) {
        // Forward the error to the next middleware
        next(error)
    }
}

// Function to delete a package by ID
export const deletePackage = async (req, res, next) => {
    try {
        // Delete the package identified by req.params.id
        await Package.findByIdAndDelete(req.params.id)

        // Send a success response indicating the package has been deleted
        res.status(200).json({ message: 'package has been deleted' })
    } catch (error) {
        // Forward the error to the next middleware
        next(error)
    }
}

// Exporting the CRUD functions to be used in the application routes

