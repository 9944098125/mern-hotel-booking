import jwt from 'jsonwebtoken';
import {createError} from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    // if there is no token at all creates error with not authenticated user
    if (!token) {
        return next(createError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid..."))
        }
        req.user = user
        next()
    })
}

/* Here it verifies the token with JWT we created
 and if token matches it declares user in the request is the authenticated user
and proceeds to next process i.e.. to the next route OR
 if token doesn't match it returns error that token is invalid  */

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }else {
            return next(createError(403, "You are not authorized..."))
        }
    })
};

/* Here it firstly checks whether token is valid or not and if it is valid,
then it checks whether requesting user's id is matching with id in params OR isAdmin of user
and if it is matching it proceeds to next process or if it fails to match then it throws error 
with not authorized  */

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        }else {
            return next(createError(403, "You are not authorized..."))
        }
    })
};