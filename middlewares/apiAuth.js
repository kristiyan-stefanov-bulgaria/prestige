const { CustomAPI } = require("../models");

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

  next();
}

const isExpired = (expires) => {
  return new Date().getTime() > expires;
}

const getAPIKey = async (apiKey) => {
  let result = await CustomAPI.find({ apiKey: apiKey }).limit(1);

  return result;
};

module.exports = {
  getAPIKey,
  customAPIKeyAuth,
  isExpired
};