import PkgListning from "../models/pkglistning.model.js";

export const createPkg = async (req, res, next) => {

    try {

        const pkgListning = await PkgListning.create(req.body);
        return res.status(201).json(pkgListning);
        
    } catch (error){
        next(error);
        
    }
}