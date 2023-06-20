const express = require('express');
const router = express.Router();

const { customAPIKeyAuth } = require('../../../../middlewares/apiAuth');
const logicProfileController = require('../../../../controllers/logicProfilesController');

router.get('/getLogicProfiles', customAPIKeyAuth, async (req, res) => {
    const { success, message, logicProfiles } = await logicProfileController.getLogicProfiles(res.locals.userID);

    if (success) {
        return res.status(200).json({ success, logicProfiles });
    }

    return res.status(500).json({ success, message });
});

router.patch('/updateLogicProfile', customAPIKeyAuth, async (req, res) => {
    const { success, message } = await logicProfileController.updateLogicProfile(req.body, res.locals.userID);

    if (success) {
        return res.status(200).json({ success, message });
    }

    return res.status(500).json({ success, message });
});

router.delete('/deleteLogicProfile', customAPIKeyAuth, async (req, res) => {
    const { success, message } = await logicProfileController.deleteLogicProfile(req.query.logicProfileID, res.locals.userID);

    if (success) {
        return res.status(200).json({ success, message });
    }

    return res.status(500).json({ success, message });
});

router.post('/addLogicProfile', customAPIKeyAuth, async (req, res) => {
    const requestData = req.body;
    const { success, message } = await logicProfileController.addLogicProfile(requestData, res.locals.userID);

    if (success) {
        return res.status(200).json({ success, message });
    }

    return res.status(500).json({ success, message });
});

module.exports = router;