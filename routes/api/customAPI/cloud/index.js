const express = require('express');
const router = express.Router();

const cloudController = require('../../../../controllers/cloudController');
const { customAPIKeyAuth } = require('../../../../middlewares/apiAuth');

router.post('/createProject', customAPIKeyAuth, async (req, res) => {
  const { success, message } = await cloudController.createCloudProject(req.body, res.locals.userID);

  if (success) {
    return res.status(200).json({ success, message });
  }

  return res.status(400).json({ success, message });
});

router.get('/getProjects', customAPIKeyAuth, async (req, res) => {
  const { success, message, cloudProjects } = await cloudController.getCloudProjects(res.locals.userID);

  if (success) {
    return res.status(200).json({ success, message, cloudProjects });
  }

  return res.status(400).json({ success, message });
});

router.patch('/updateProject', customAPIKeyAuth, async (req, res) => {
  const { success, message } = await cloudController.updateCloudProject(req.body.name, req.body.projectID);

  if (success) {
    return res.status(200).json({ success, message });
  }

  return res.status(400).json({ success, message });
});

router.delete('/deleteProject', customAPIKeyAuth, async (req, res) => {
  const { success, message } = await cloudController.deleteCloudProject(req.body.cloudProjectID, res.locals.userID);

  if (success) {
    return res.status(200).json({ success, message });
  }

  return res.status(400).json({ success, message });
});

router.post('/createDroplet', customAPIKeyAuth, async (req, res) => {
  const { success, message } = await cloudController.createCloudDroplet(req.body);

  if (success) {
    return res.status(200).json({ success, message });
  }

  return res.status(400).json({ success, message });
});

router.get('/getDroplets', customAPIKeyAuth, async (req, res) => {
  const { success, message, cloudDroplets } = await cloudController.getCloudDroplets(req.query.cloudProjectID);

  if (success) {
    return res.status(200).json({ success, message, cloudDroplets });
  }

  return res.status(400).json({ success, message });
});

router.delete('/deleteDroplet', customAPIKeyAuth, async (req, res) => {
  const { success, message } = await cloudController.deleteCloudDroplet(req.body.dropletID);

  if (success) {
    return res.status(200).json({ success, message });
  }

  return res.status(400).json({ success, message });
});

router.patch('/updateDroplet', customAPIKeyAuth, async (req, res) => {
  const { success, message } = await cloudController.updateCloudDroplet(req.body.dropletID, req.body.dropletData)

  if (success) {
    return res.status(200).json({ success, message });
  }

  return res.status(400).json({ success, message });
});

module.exports = router;
