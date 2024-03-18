import Event from "../models/eventModel.js"
import mongoose from "mongoose";

//get all events
export const getEvents = async (req, res) => {
  const events = await Event.find({}).sort({ createdAt: -1 });

  res.status(200).json(events);
};

//get a single event
export const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ error: "No such event" });
  }

  res.status(200).json(event);
};

//create new event
export const createEvent = async (req, res) => {
  const { type, name, date, time, location, price, description, MaxParticipants } = req.body;

  //add doc to db
  try {
    const event = await Event.create({
      type,
      name,
      date,
      time,
      location,
      price,
      MaxParticipants,
      description
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await Event.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(400).json({ error: "No such event" });
  }

  res.status(200).json(event);
};

//update a event
export const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await Event.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!event) {
    return res.status(400).json({ error: "No such event" });
  }

  res.status(200).json(event);
};


