import express from "express";
// const Event = require('../models/eventModel')
import {
  createEvent,
  getEvents,
  getEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

//GET all events
router.get("/", getEvents);

//GET a single event
router.get("/:id", getEvent);

//POST a new event
router.post("/add", createEvent);

//DELETE a event
router.delete("/:id", deleteEvent);

//UPDATE a event
router.put("/:id", updateEvent);

export default router;
