import PkgListning from "../models/pkglistning.model.js";
import { errorHandler } from "../utils/error.js";

export const createPkg = async (req, res, next) => {

    try {

        const pkgListning = await PkgListning.create(req.body);
        return res.status(201).json(pkgListning);
        
    } catch (error){
        next(error);
        
    }
}

export const deletePkg = async (req, res, next) => {
    const pkg = await PkgListning.findById(req.params.id);

    if (!pkg) {
        return next(errorHandler(404, 'Package not found'));
    }

    if(req.user.id !== pkg.userRef){
        return next(errorHandler(401, 'you can delete your own packages'))
    }

    try {
        await PkgListning.findByIdAndDelete(req.params.id);
        res.status(200).json('Package deleted')
    } catch (error) {
        next(error);
    }
}

export const updatePkg = async (req, res, next) => {
    const pkg = await PkgListning.findById(req.params.id);

    if (!pkg) {
        return next(errorHandler(404, 'Package not found'));
    }

    if(req.user.id !== pkg.userRef){
        return next(errorHandler(401, 'you can update your own packages'))
    }

    try {
        const updatedPkg = await PkgListning.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedPkg)
    } catch (error) {
        next(error);
    }
};

export const getPkg = async (req, res, next) => {
    
    try {
        const pkg = await PkgListning.findById(req.params.id);
        if (!pkg) {
            return next(errorHandler(404, 'Package not found'));
        }
        res.status(200).json(pkg)
    } catch (error) {
        next(error);
    }
};