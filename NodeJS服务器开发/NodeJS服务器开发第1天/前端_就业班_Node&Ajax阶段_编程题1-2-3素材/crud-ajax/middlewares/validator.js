const Ajv = require('ajv')

module.exports = (obj) => {
  return (req, res, next) => {
    const len = Object.keys(obj).length
    let count = 0
    for (let key in obj) {
      const data = req[key]
      const schema = obj[key]

      const ajv = new Ajv()
      const validate = ajv.compile(schema)
      const valid = validate(data)
      
      if (valid) {
        count++
      } else {
        const error = validate.errors[0]
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: `${key === 'query' ? 'querystring' : key}${error.dataPath} ${error.message}`
        })
      }
      
      if (count === len) {
        return next()
      }
    }
  }
}
