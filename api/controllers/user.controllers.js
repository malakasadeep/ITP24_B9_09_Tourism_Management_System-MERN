import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        message: 'Api route is working',
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"))
    try {
        if (req.user.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(req.user.id, {
            $set:{
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                country: req.body.country,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true});

        const {password, ...rest} = updateUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};