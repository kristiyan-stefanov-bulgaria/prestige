const { User } = require('../models')

/**
 * Retrieves events for a given user.
 * @param {string} userID - The ID of the user.
 * @returns {Promise<Object>} An object containing the success status and events.
 *                            If successful, success will be true and events will contain the user's events.
 *                            If unsuccessful, success will be false and message will provide an error message.
 */
const getEvents = async (userID) => {
  const user = await User.find({ _id: userID });

  if (user.length === 0) {
    return { success: false, message: 'User not found' }
  }

  const events = user[0].events;

  if (events.length === 0) {
    return { success: false, message: 'User has no events' }
  }

  return { success: true, events }
}

/**
 * Deletes an event for a given user.
 * @param {string} userID - The ID of the user.
 * @param {string} eventID - The ID of the event to delete.
 * @returns {Promise<Object>} An object containing the success status and a message.
 *                            If successful, success will be true and message will indicate successful deletion.
 *                            If unsuccessful, success will be false and message will provide an error message.
 */
const deleteEvent = async (userID, eventID) => {
  if (userID.length === 0) {
    return { success: false, message: 'User ID is empty' }
  }

  if (eventID.length === 0) {
    return { success: false, message: 'Event ID is empty' }
  }

  try {
    let a = await User.updateOne({ _id: userID }, { $pull: { events: { _id : eventID } } });

    return { success: true, message: 'Event deleted successfully' }

  } catch (err) {
    return { success: false, message: err.message }
  }
};

/**
 * Adds an event for a given user.
 * @param {string} userID - The ID of the user.
 * @param {Object} event - The event object to add.
 * @returns {Promise<Object>} An object containing the success status and a message.
 *                            If successful, success will be true and message will indicate successful addition.
 *                            If unsuccessful, success will be false and message will provide an error message.
 */
const addEvent = async (userID, event) => {
  if (event.length === 0) {
    return { success: false, message: 'Event is empty' }
  }

  if (userID.length === 0) {
    return { success: false, message: 'User ID is empty' }
  }

  try {
    await User.updateOne({ _id: userID }, { $push: { events: event } });

    return { success: true, message: 'Event added successfully' }
  } catch (err) {
    return { success: false, message: err.message }
  }
};

module.exports = {
  getEvents,
  addEvent,
  deleteEvent
}