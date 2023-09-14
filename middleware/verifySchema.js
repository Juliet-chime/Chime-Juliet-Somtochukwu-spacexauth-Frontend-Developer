const verifySchema = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body)

        const { error } = result

        const message = error?.details.map(i => i.message).join(',');

        if (!error) {
            next()
        } else {
            res.status(400).json({ message })
        }
    }
}
module.exports = verifySchema