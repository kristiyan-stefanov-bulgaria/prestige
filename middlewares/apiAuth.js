const { CustomAPI, User } = require("../models");


/**
 * Middleware for custom API key authentication.
 * Checks if the API key provided is valid.
 */
const customAPIKeyAuth = async (req, res, next) => {
  const apiKeyReq = req.headers['x-api-key'];

  if (!apiKeyReq) {
    return res.status(401).json({ message: 'No API key provided.' });
  }

  let apiKey = await getAPIKey(apiKeyReq);

  if (apiKey.length <= 0 ) {
    return res.status(401).json({ message: 'Invalid API key.' });
  }

  apiKey = apiKey[0];

  if (isExpired(apiKey.expires)) {
    return res.status(401).json({ message: 'API key has expired.' });
  }

  res.locals.apiKeyID = apiKey._id;
  res.locals.userID = await getUserByAPIKey(apiKey._id)
  next();
}

const getUserByAPIKey = async (apiKeyID) => {
  const user = await User.find({ customAPI: apiKeyID })

  return user;
};

/**
 * Checks if a given expiration date has already passed.
 *
 * @param {Date} expires - The expiration date to check.
 * @returns {boolean} - Indicates if the expiration date has passed.
 */
const isExpired = (expires) => {
  return new Date().getTime() > expires;
}

/**
 * Checks if an API key exists in the CustomAPI collection.
 *
 * @async
 * @param {string} apiKey - The API key to check for existence.
 * @returns {Promise<boolean>} - A promise that resolves if this API key exists.
 */
const getAPIKey = async (apiKey) => {
  let result = await CustomAPI.find({ apiKey: apiKey }).limit(1);

  return result;
};

module.exports = {
  getAPIKey,
  customAPIKeyAuth,
  isExpired
};