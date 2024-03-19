import express from 'express';
import { Restuarant } from '../models/RestuarantDetails'

const router = express.Router();

// Route for Save a new Restuarant
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.Res_OwnerName||
      !request.body.Res_Name ||
      !request.body.Location ||
      !request.body.Description

    ) {
      return response.status(400).send({
        message: 'Send all required fields: Res_OwnerName, Res_Name, Location,Description',
      });
    }
    const newRestuarant = {
        Res_OwnerName: request.body.Res_OwnerName,
        Res_Name: request.body.Res_Name,
        Location: request.body.Location,
    };

    const restuarant = await Restuarant.create(newRestuarant);

    return response.status(201).send(restuarant);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Retuarants from database
router.get('/', async (request, response) => {
  try {
    const restuarant = await Book.find({});

    return response.status(200).json({
      count: restuarant.length,
      data: restuarant,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Restuarant from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const  retuarant= await Restuarant.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Restuarant
router.put('/:id', async (request, response) => {
  try {
    if (
        !request.body.Res_OwnerName||
        !request.body.Res_Name ||
        !request.body.Location ||
        !request.body.Description
    ) {
      return response.status(400).send({
        message: 'Send all required fields: Res_OwnerName, Res_Name, Location,Description',
      });
    }

    const { id } = request.params;

    const result = await Restuarant.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Restuarant not found' });
    }

    return response.status(200).send({ message: 'Restuarant updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a Restuarant
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Restuarant.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Restuarant not found' });
    }

    return response.status(200).send({ message: 'Restuarant deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;