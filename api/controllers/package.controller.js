import PkgListning from "../models/pkglistning.model.js";
import { errorHandler } from "../utils/error.js";

export const createPkg = async (req, res, next) => {
  try {
    const pkgListning = await PkgListning.create(req.body);
    return res.status(201).json(pkgListning);
  } catch (error) {
    next(error);
  }
};

export const deletePkg = async (req, res, next) => {
  const pkg = await PkgListning.findById(req.params.id);

  if (!pkg) {
    return next(errorHandler(404, "Package not found"));
  }

  /*if (req.user.id !== pkg.userRef) {
    return next(errorHandler(401, "you can delete your own packages"));
  }*/

  try {
    await PkgListning.findByIdAndDelete(req.params.id);
    res.status(200).json("Package deleted");
  } catch (error) {
    next(error);
  }
};

export const updatePkg = async (req, res, next) => {
  const pkg = await PkgListning.findById(req.params.id);

  if (!pkg) {
    return next(errorHandler(404, "Package not found"));
  }

  /*if (req.user.isadmin === false || req.user.id !== pkg.userRef) {

    return next(errorHandler(401, "you can update your own packages"));
  }*/

  try {
    const updatedPkg = await PkgListning.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPkg);
  } catch (error) {
    next(error);
  }
};

export const getPkg = async (req, res, next) => {
  try {
    const pkg = await PkgListning.findById(req.params.id);
    if (!pkg) {
      return next(errorHandler(404, "Package not found"));
    }
    res.status(200).json(pkg);
  } catch (error) {
    next(error);
  }
};

export const getPkgsSearch = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let dining = req.query.dining;
    if (dining === undefined || dining === "false") {
      dining = { $in: [false, true] };
    }

    let transport = req.query.transport;
    if (transport === undefined || transport === "false") {
      transport = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["reguler", "couple", "family"] };
    }

    let hoteltype = req.query.hoteltype;
    if (hoteltype === undefined || hoteltype === "all") {
      hoteltype = { $in: ["3 Star Hotel", "4 Star Hotel", "5 Star Hotel"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const days = req.query.days || 0;

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const pkgs = await PkgListning.find({
      title: { $regex: searchTerm, $options: "i" },
      days: { $gte: days },
      offer,
      dining,
      transport,
      type,
      hoteltype,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(pkgs);
  } catch (error) {
    next(error);
  }
};

//get all Packages
export const getAllPackages = async (req, res) => {
  const pkg = await PkgListning.find({}).sort({ createdAt: -1 });

  res.status(200).json(pkg);
};
