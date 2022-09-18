"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.type) {
        if (err.message) {
            return res.status(errorTypeToStatusCode(err.type)).send(err.message);
        }
        return res.sendStatus(errorTypeToStatusCode(err.type));
    }
    return res.sendStatus(500);
}
exports.errorHandler = errorHandler;
function errorTypeToStatusCode(errorType) {
    if (errorType === 'unprocessable_entity')
        return 422;
    if (errorType === 'conflict')
        return 409;
    if (errorType === 'not_found')
        return 404;
    if (errorType === 'forbidden')
        return 403;
    if (errorType === 'unauthorized')
        return 401;
    return 400;
}
