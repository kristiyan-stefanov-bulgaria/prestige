const express = require('express');
const router = express.Router();

const { customAPIKeyAuth } = require('../../../../middlewares/apiAuth');
const storageProfilesController = require('../../../../controllers/storageProfilesController');

router.post('/addStorageProfile', customAPIKeyAuth, async (req, res) => {
  const { success, message } = await storageProfilesController.addStorageProfile(req.body, res.locals.userID);

  if (success) {
    return res.status(200).json({ success, message });
  }

  return res.status(400).json({ success, message });
});

router.get('/getStorageProfiles', customAPIKeyAuth, async (req, res) => {
  const { success, message, storageProfiles } = await storageProfilesController.getStorageProfiles(res.locals.userID);

  if (success) {
    return res.status(200).json({ success, storageProfiles });
  }

  return res.status(400).json({ success, message });
});

router.delete('/deleteStorageProfile', customAPIKeyAuth, async (req, res) => {
  const storageProfileID = req.query.storageProfileID;
  const { success, message } = await storageProfilesController.deleteStorageProfile(storageProfileID, res.locals.userID);

  if (success) {
    return res.status(200).json({ success, message });
  }

  return res.status(400).json({ success, message });
});

router.patch('/updateStorageProfile', customAPIKeyAuth, async (req, res) => {
  const { success, message } = await storageProfilesController.updateStorageProfile(req.body);

  if (success) {
    return res.status(200).json({ success, message });
  }

  return res.status(400).json({ success, message });
});

module.exports = router;