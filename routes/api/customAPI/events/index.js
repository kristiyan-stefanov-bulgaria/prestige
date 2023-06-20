const express = require('express');
const router = express.Router();

const eventsController = require('../../../../controllers/eventsController');

const { customAPIKeyAuth } = require('../../../../middlewares/apiAuth');

router.get('/getEvents', customAPIKeyAuth, async (req, res) => {
  // Add new event
  // await eventsController.addEvent(res.locals.userID, {
  //   type: 1,
  //   name: "My very first event",
  //   note: "Mr Prestige is kinda sus",
  // });

  const { success, message, events } = await eventsController.getEvents(res.locals.userID);

  if (success) {
    return res.status(200).json({ success, events });
  }

  return res.status(500).json({ success, message });
});

router.delete('/deleteEvent', customAPIKeyAuth, async (req, res) => {
  const { success, message } = await eventsController.deleteEvent(res.locals.userID, req.query.eventID)

  if (success) {
    return res.status(200).json({ success, message });
  }

  return res.status(500).json({ success, message });
});

module.exports = router;