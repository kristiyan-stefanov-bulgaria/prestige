const express = require('express');
const router = express.Router();

const { customAPIKeyAuth } = require('../../../../middlewares/apiAuth');
const { User } = require('../../../../models');

router.get('/getLicense', customAPIKeyAuth, async (req, res) => {
  const apiKeyID = res.locals.apiKeyID
  const user = await User.find({ customAPI: apiKeyID });

  if (user.length <= 0) {
    return res.status(200).json({ success: false, message: 'No license found.' });
  }

  return res.status(200).json({ success: true, license: user[0].license });
});

module.exports = router;
