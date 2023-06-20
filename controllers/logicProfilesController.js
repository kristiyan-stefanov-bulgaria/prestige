const { LogicProfile, User }= require('../models')

/**
 * Retrieves logic profiles associated with a user.
 *
 * @async
 * @param {string} userID - The ID of the user to retrieve logic profiles for.
 * @returns {Promise<{ success: boolean, message: string, logicProfiles?: Object[] }>} - A promise that resolves to an object indicating the success status, a message, and an optional array of logic profiles.
 */
const getLogicProfiles = async (userID) => {
  const user = await getUser(userID);

  if (user.logicProfiles.length === 0) {
    return { success: false, message: 'No logic profiles found.' }
  }

  const logicProfiles = await LogicProfile.find({ _id: { $in: user.logicProfiles } });

  if (logicProfiles.length === 0) {
    return { success: false, message: 'No logic profiles found.' }
  }

  return { success: true, logicProfiles }
}

/**
 * Updates a logic profile associated with a user.
 *
 * @async
 * @param {Object} logicProfileData - The updated data for the logic profile.
 * @param {string} userID - The ID of the user associated with the logic profile.
 * @returns {Promise<{ success: boolean, message: string }>} - A promise that resolves to an object indicating the success status and a message.
 */
const updateLogicProfile = async (logicProfileData, userID) => {
  if (!userID || logicProfileData.length <= 0) {
    return { success: false, message: 'No logic profile ID provided.' }
  }

  const logicProfile = await LogicProfile.findOne({ _id: logicProfileData._id });
  if (!logicProfile) {
    return { success: false, message: 'Logic profile not found.' }
  }

  try {
    await LogicProfile.updateOne({ _id: logicProfile._id }, logicProfileData);

    await User.updateOne(
      { _id: userID },
      { $pull: { logicProfiles: logicProfile._id } }
    );

    return { success: true, message: 'Logic profile updated successfully.' }
  } catch (error) {

    return { success: false, message: error.message }
  }
};

/**
 * Deletes a logic profile associated with a user.
 *
 * @async
 * @param {string} logicProfileID - The ID of the logic profile to delete.
 * @param {string} userID - The ID of the user associated with the logic profile.
 * @returns {Promise<{ success: boolean, message: string }>} - A promise that resolves to an object indicating the success status and a message.
 */
const deleteLogicProfile = async (logicProfileID, userID) => {
  if (!userID || !logicProfileID) {
    return { success: false, message: 'No logic profile ID provided.' }
  }

  const logicProfile = await LogicProfile.findOne({ _id: logicProfileID });

  if (!logicProfile) {
    return { success: false, message: 'Logic profile not found.' }
  }

  try {
    await logicProfile.deleteOne({ _id: logicProfile._id });
    await User.updateOne(
      { _id: userID },
      { $pull: { logicProfiles: logicProfile._id } }
    );

    return { success: true, message: 'Logic profile deleted successfully.' }
  } catch (error) {
    return { success: false, message: error.message }
  }
};

/**
 * Adds a logic profile for a user.
 *
 * @async
 * @param {Object} logicProfileData - The data for the logic profile to add.
 * @param {string} userID - The ID of the user associated with the logic profile.
 * @returns {Promise<{ success: boolean, message: string }>} - A promise that resolves to an object indicating the success status and a message.
 */
const addLogicProfile = async (logicProfileData, userID) => {
  const logicProfile = new LogicProfile(logicProfileData);

  try {
    await logicProfile.save();
    await User.updateOne(
      { _id: userID },
      { $push: { logicProfiles: logicProfile._id } }
    );

    return { success: true, message: 'Logic Profile added successfully.' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

/**
 * Retrieves a user by their ID from the database.
 *
 * @async
 * @param {string} userID - The ID of the user.
 * @returns {Promise<Object>} A Promise that resolves to the user object.
 * @throws {Error} If an error occurs during the database query or user retrieval.
 */
const getUser = async (userID) => {
  const user = await User.findOne({ _id: userID });

  return user;
};

module.exports = {
  addLogicProfile,
  getLogicProfiles,
  getUser,
  deleteLogicProfile,
  updateLogicProfile
}