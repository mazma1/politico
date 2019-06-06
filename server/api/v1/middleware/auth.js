import jwt from 'jsonwebtoken';

const Authorize = {
  /**
  * Verifies authentication token provided by the client
  *
  * @param {object} req - Request from the client
  * @param {object} res - Response sent back to the client
  * @param {function} next - Executes succeeding middleware
  * @returns {function} next
 */
  isLoggedIn: (req, res, next) => {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return error.message === 'jwt expired'
            ? res.status(401).json({ error: 'Access token has expired' })
            : res.status(401).json({ error: 'Invalid access token' });
        }

        req.decoded = decoded;
        return next();
      });
    } else {
      res.status(401).json({ error: 'No token provided.' });
    }
  },

  /**
  * Checks if user is an admin or not
  *
  * @param {object} req - Request from the client
  * @param {object} res - Response sent back to the client
  * @param {function} next - Executes succeeding middleware
  * @returns {function} next
 */
  isAdmin: (req, res, next) => {
    const { isAdmin } = req.decoded.data;

    return parseInt(isAdmin, 10)
      ? next()
      : res.status(403).json({ error: 'Unauthorized request' });
  },
};

export default Authorize;
