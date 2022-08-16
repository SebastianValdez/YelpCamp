module.exports = (func) => { // * Quick way of using a try-catch block on a method, this way we can just pass the function into this function
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
}