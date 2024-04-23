import Guide from "../models/Guide.model.js";
export const createGuide = async (req, res, next) => {
  try {
    const guide = await Guide.create(req.body);
    return res.status(201).json(guide);
  } catch (error) {
    next(error);
  }
};

export const Deleteguide = async (req, res, next) => {
  const guiding = await Guide.findById(req.params.id);

  if (!guiding) {
    return next(errorHandler(404, "Guide not found!"));
  }

  // if (req.user.id !== guiding.userRef) {
  //   return next(errorHandler(401, "You can only delete your own guides!"));
  // }

  try {
    await Guide.findByIdAndDelete(req.params.id);
    res.status(200).json("Guide has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateGuide = async (req, res, next) => {
  const guiding = await Guide.findById(req.params.id);
  if (!guiding) {
    return next(errorHandler(404, "guide not found!"));
  }
  // if (req.user.id !== guiding.userRef) {
  //   return next(errorHandler(401, "You can only update your own guides!"));
  // }

  try {
    const updatedguiding = await Guide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedguiding);
  } catch (error) {
    next(error);
  }
};
export const getGuide = async (req, res, next) => {
  try {
    const guiding = await Guide.findById(req.params.id);
    if (!guiding) {
      return next(errorHandler(404, "guide not found!"));
    }
    res.status(200).json(guiding);
  } catch (error) {
    next(error);
  }
};

export const getGuidSearch = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let language = req.query.language;
    if (language === undefined || language === "all") {
      language = { $in: ["Sinhala", "English", "Hindi", "Arab"] };
    }
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const guides = await Guide.find({
      name: { $regex: searchTerm, $options: "i" },
      language,
      //usertype,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(guides);
  } catch (error) {
    next(error);
  }
};
