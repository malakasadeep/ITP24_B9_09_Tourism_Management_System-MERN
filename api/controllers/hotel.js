
import Hotel from "../models/Hotel.js"
import { errorHandler } from "../utils/error.js";


  
 // create Hotel//
 export const createhotel = async (req, res, next) => {

  try {

      const hotelListning = await Hotel.create(req.body);
      return res.status(201).json(hotelListning);
      
  } catch (error){
      next(error);
      
  }
}
//delete Hotel//
export const deletehotel = async (req, res, next) => {
  const hotel = await hotelListning.findById(req.params.id);

  if (!hotel) {
      return next(errorHandler(404, 'Hotel not found'));
  }

  if(req.user.id !== pkg.userRef){
      return next(errorHandler(401, 'you can delete your own Hotel'))
  }

  try {
      await hotelListning.findByIdAndDelete(req.params.id);
      res.status(200).json('Hotel deleted')
  } catch (error) {
      next(error);
  }
}
//update Hotel//
export const updatehotel = async (req, res, next) => {
  const hotel = await hotelListning.findById(req.params.id);

  if (!hotel) {
      return next(errorHandler(404, 'Hotel not found'));
  }

  if(req.user.id !== hotel.userRef){
      return next(errorHandler(401, 'you can update your own Hotel'))
  }

  try {
      const updatedhotel = await hotelListning.findByIdAndUpdate(req.params.id, req.body, {new: true});
      res.status(200).json(updatedhotel)
  } catch (error) {
      next(error);
  }
};
 
//get Hotel//
export const gethotel = async (req, res, next) => {
    
  try {
      const hotel = await hotelListning.findById(req.params.id);
      if (!hotel) {
          return next(errorHandler(404, 'Hotel not found'));
      }
      res.status(200).json(hotel)
  } catch (error) {
      next(error);
  }
};

//get all Hotels
export const getAllHotel = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        isApproved: true,
        cheapestPrice: { $gt: min | 1, $lt: max || 100000 }
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      res.status(500).json(err);
    }
  };

//search hotel

export const gethotelsSearch = async (req, res, next) => {
  try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;

      let featured = req.query.featured;
      if (featured === undefined || featured === 'false'){
          featured = {$in: [false, true]};
      }

      let availableWork = req.query.availableWork;
      if (availableWork === undefined || availableWork === 'false'){
        availableWork = {$in: [false, true]};
      }

      let sustainability = req.query.sustainability;
      if (sustainability === undefined || sustainability === 'false'){
        sustainability = {$in: [false, true]};
      }

      let type = req.query.type;
      if (type === undefined || type === 'all'){
          type = {$in: ['reguler', 'couple', 'family']};
      }

      let hoteltype = req.query.hoteltype;
      if (hoteltype === undefined || hoteltype === 'all'){
          hoteltype = {$in: ['3 Star Hotel', '4 Star Hotel', '5 Star Hotel']};
      }

      const searchTerm = req.query.searchTerm || '';

      const province = req.query.province || '';
      
      const city = req.query.city || '';

      const sort = req.query.sort || 'createdAt';

      const order = req.query.order || 'desc';


      const pkgs = await HotelListning.find({
        name: {$regex: searchTerm, $options: 'i'},
        province: {$regex: province, $options: 'i'},
        city: {$regex: city, $options: 'i'},

          days: {$gte: days},
          featured,
          availableWork,
          sustainability,
          type,
          hoteltype,
      })
      .sort({[sort]: order})
      .limit(limit)
      .skip(startIndex);

      return res.status(200).json(pkgs);


  } catch (error) {
      next(error);
  }
};







