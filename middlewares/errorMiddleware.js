export const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    // check for Mongoose bad objectId
    if (err.name === "CastError" && err.kind === "ObjectId") {
        message = `Result not found`
        statusCode = 404
    } else {
        res.status(statusCode).json({
            message,
            stack : process.env.NODE_ENV === "production" ? "🥞" : err.stack
        })
    }
}

