import jwt from "jsonwebtoken";
import HttpError from "../utils/httpError";
import TestUser from "../models/testUser";

const authCheck = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (! token) {
                return next(new HttpError('Authentication failed!', 403))
            } else {
                const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
                /**
                 * TestUser should be replaced by required collection name
                 * userId should be replaced by the _id you are assigning from jwt.sign() method
                 */
                const validUser = await TestUser.findOne({ _id : decodedToken.userId })
                if (! validUser) {
                    return next(new HttpError("Invalid credentials!",400))
                } else {
                    /**
                     * req.userData should be replaced required variable name
                     * should append data to userData according to data signed from jwt.sign() method
                     */
                    req.userData = { userId : decodedToken.userId, role : decodedToken.role }
                    next()
                }
            }
        } catch (error) {
            return next(new HttpError('Authentication failed!', 403))
        }
    }
}
export default authCheck;