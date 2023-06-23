const express = require('express');
const router = express.Router();

const { customAPIKeyAuth } = require('../../../../middlewares/apiAuth');
const { User } = require('../../../../models');

router.get('/getGraph', customAPIKeyAuth, async (req, res) => {
  const user = await User.find({ _id: res.locals.userID });

  if (user.length <= 0) {
    return res.status(200).json({ success: false, message: 'No user found' });
  }

  // Graph hours is an array with 24 numbers, each index respresents an hour of the day. A.k.a index 0 represents 12:00 AM, index 12 represents 12:00 PM.
  return res.status(200).json({ success: true,  grahp: user[0].graph });
});

module.exports = router;
