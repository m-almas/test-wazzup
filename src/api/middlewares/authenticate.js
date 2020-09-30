const UserError = require('../../errors/userError')
const jwt = require('jsonwebtoken')

module.exports = (ctx) => {
  const { config, logger } = ctx
  return async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1]
      if (!accessToken) {
        throw UserError('no access token defined', 403)
      }
      const verified = jwt.verify(accessToken, config.secrets.accessToken)
      req.user = verified
      next()
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  }
}