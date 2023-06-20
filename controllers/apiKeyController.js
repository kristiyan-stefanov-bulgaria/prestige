const { Chance } = require("chance");
const { randomBytes } = require("crypto");

const { User, CustomAPI } = require("../models");

const ObjectId = require("mongoose").Types.ObjectId;

/**
 * Generates an API key with an optional prefix.
 *
 * @param {string} prefix - The prefix to be added to the API key. (Optional)
 * @param {number} [minLength=16] - The minimum length of the API key. (Default: 16)
 * @param {number} [maxLength=32] - The maximum length of the API key. (Default: 32)
 * @returns {string} - The generated API key.
 */
const generateAPIKey = (prefix, minLength = 32, maxLength = 64) => {
  if (minLength < 1 || minLength > 100)
    return { success: false, message: "Invalid minLength." };
  if (maxLength < minLength || maxLength > 100)
    return { success: false, message: "Invalid maxLength." };

  const chance = new Chance();
  const length = chance.integer({ min: minLength, max: maxLength });
  const totalBytes = Math.ceil(length / 2);

  let apiKey = randomBytes(totalBytes).toString("hex");

  if (apiKey.length > length) {
    const endIndex = apiKey.length - (apiKey.length - length);
    apiKey = apiKey.slice(0, endIndex);
  }

  if (prefix) {
    return { success: true, apiKey: `${prefix}.${apiKey}` };
  }

  return { success: true, apiKey: apiKey };
};

/**
 * Adds an API key to a user, if the key doesn't already exist.
 *
 * @async
 * @param {string} apiKey - The API key to add.
 * @param {string} userID - The ID of the user to add the API key to.
 * @returns {Promise<{ success: boolean, message: string }>} - A promise that resolves to an object indicating the success status and a message.
 */
const addAPIKeyToUser = async (apiKey, userID) => {
  if (!ObjectId.isValid(userID))
    return { success: false, message: "Invalid userID." };

  if ((await getAPIKey(apiKey).length) > 0) {
    return {
      success: false,
      message: "API key already exists.",
    };
  }

  const customAPIKey = new CustomAPI({
    apiKey: apiKey,
    createdAt: new Date(),
    // 100 Days in the future
    expires: new Date(Date.now() + 1000 * 3600 * 24 * 100),
  });

  try {
    await customAPIKey.save();
    await User.updateOne(
      { _id: userID },
      { $push: { customAPI: customAPIKey._id } }
    );

    return {
      success: true,
      message: "API key added.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

/**
 * Deletes an API key associated with a user.
 *
 * @async
 * @param {string} apiKey - The API key to delete.
 * @param {string} userID - The ID of the user associated with the API key.
 * @returns {Promise<{ success: boolean, message: string }>} - A promise that resolves to an object indicating the success status and a message.
 */
const deleteAPIKey = async (apiKey, userID) => {
  let customAPIKey = await getAPIKey(apiKey);

  if (customAPIKey.length === 0) {
    return {
      success: false,
      message: "API key does not exist.",
    };
  }

  if (!ObjectId.isValid(userID))
    return { success: false, message: "Invalid userID." };

  try {
    await CustomAPI.deleteOne({ _id: customAPIKey[0]._id });
    await User.updateOne(
      { _id: userID },
      { $pull: { customAPI: customAPIKey[0]._id } }
    );

    return {
      success: true,
      message: "API key deleted.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

/**
 * Refreshes the expiration date of an API key associated with a user.
 *
 * @async
 * @param {string} apiKey - The API key to refresh.
 * @param {string} userID - The ID of the user associated with the API key.
 * @returns {Promise<{ success: boolean, message: string }>} - A promise that resolves to an object indicating the success status and a message.
 */
const refreshAPIKey = async (apiKey, userID) => {
  const customAPIKey = await getAPIKey(apiKey);

  if (customAPIKey.length === 0) {
    return {
      success: false,
      message: "API key does not exist.",
    };
  }

  if (!ObjectId.isValid(userID))
    return { success: false, message: "Invalid userID." };

  try {
    await CustomAPI.updateOne(
      { _id: customAPIKey[0]._id },
      { $set: { expires: new Date(Date.now() + 1000 * 3600 * 24 * 100) } }
    );
    await User.updateOne(
      { _id: userID },
      { $pull: { customAPI: customAPIKey[0]._id } }
    );
    return {
      success: true,
      message: "API key refreshed.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

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
  generateAPIKey,
  addAPIKeyToUser,
  getAPIKey,
  deleteAPIKey,
  refreshAPIKey,
};
