const headerData = ["body", "params", "query"];

const validationFunc = (schema) => {
    return (req, res, next) => {
        let errorsList = [];
        headerData.forEach((key) => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key]);
                if (validationResult.error) {
                    errorsList.push(validationResult.error.details);
                }
            }
        })
        if (errorsList.length) {
            res.status(400).json({ message: "Error", errorsList });
        }
        else {
            next();
        }
    }
}

module.exports = validationFunc;