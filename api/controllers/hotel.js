import express from 'express';
import Hotel from "../models/Hotel.js"
import multer from "multer"
import path from "path"




//img upload part
export const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null,"images")
    },
    filename : (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname) );
    } 
});

export const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'));
      }
      cb(null, true);
    }
  }).fields([
    { name: 'HotelImg', maxCount: 1 },
    { name: 'HotelImgs', maxCount: 5 },
    { name: 'certificates', maxCount: 2}
  ]);

  // Create a new hotel
  export const createHotel = async (req, res) => {
    try {
      // Use Multer middleware to handle file upload
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error uploading images" });
        }  
  
        // Extract the file names from the request object
        const hotelImg = req.files.HotelImg[0].filename;
        const HotelImgs = req.files.HotelImgs.map((file) => file.filename);
        const certificates=req.files.certificates.map((file)=>file.filename);
  
        // Create a new hotel object from the request body and file names
        const newHotel = new Hotel({ 
          ...req.body,   
          HotelImg: hotelImg,
          HotelImgs:HotelImgs,
          certificates:certificates
        }); 
  
        // Save the new hotel to the database
        await newHotel.save();
  
        // Send a response with the new hotel object 
        res.status(200).json(newHotel); 
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    } 
  };  
  
 // create Hotel//
 export const createhotel = async (req, res, next) => {

  try {

      const hotelListning = await hotelListning.create(req.body);
      return res.status(201).json(hotelListning);
      
  } catch (error){
      next(error);
      
  }
}
//delete Hotel//
export const deletehotel = async (req, res, next) => {
  const hotel = await hotelListning.findById(req.params.id);

  if (!hotel) {
      return next(errorHandler(404, 'Package not found'));
  }

  if(req.user.id !== pkg.userRef){
      return next(errorHandler(401, 'you can delete your own packages'))
  }

  try {
      await hotelListning.findByIdAndDelete(req.params.id);
      res.status(200).json('Package deleted')
  } catch (error) {
      next(error);
  }
}
//update Hotel//
export const updatehotel = async (req, res, next) => {
  const hotel = await hotelListning.findById(req.params.id);

  if (!hotel) {
      return next(errorHandler(404, 'Package not found'));
  }

  if(req.user.id !== hotel.userRef){
      return next(errorHandler(401, 'you can update your own packages'))
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
          return next(errorHandler(404, 'Package not found'));
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



/*export const gethotelsSearch = async (req, res, next) => {
  try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;

      let offer = req.query.offer;
      if (offer === undefined || offer === 'false'){
          offer = {$in: [false, true]};
      }

      let dining = req.query.dining;
      if (dining === undefined || dining === 'false'){
          dining = {$in: [false, true]};
      }

      let transport = req.query.transport;
      if (transport === undefined || transport === 'false'){
          transport = {$in: [false, true]};
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

      const days = req.query.days || 0;

      const sort = req.query.sort || 'createdAt';

      const order = req.query.order || 'desc';


      const pkgs = await PkgListning.find({
          title: {$regex: searchTerm, $options: 'i'},
          days: {$gte: days},
          offer,
          dining,
          transport,
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
};*/







