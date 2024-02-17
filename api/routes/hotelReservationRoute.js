import express from 'express';
import { reservation, getAllReservation } from '../controllers/hotelReservation.js';


  const router =express.Router();
  //Create
  router.post("/reservation",reservation)
  router.get("/getAll",getAllReservation)


export default router