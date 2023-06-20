const express = require('express');
const router = express.Router();

const apiKeyController = require('../../../controllers/apiKeyController');

router.post('/addAPIKey', async (req, res) => {
  // Example request:  POST localhost:3000/api/customAPI/addAPIKey with payload: {"prefix":"prestigeBot","minLength":84,"maxLength":100, "userID": "6491028eb963d3a07390873e"}
  const { prefix, minLength, maxLength, userID } = req.body;

  let { success, message, apiKey } = apiKeyController.generateAPIKey(prefix, minLength, maxLength);

  if (success) {
    let { success, message } = await apiKeyController.addAPIKeyToUser(apiKey, userID);

    if (success) {
      return res.status(200).json({ success, message: 'API key added.' });
    }

    return res.status(500).json({ success, message });
  }

  return res.status(500).json({ success: false, message: message });
});

router.delete('/deleteAPIKey', async (req, res) => {
  const { apiKey, userID } = req.body;
  // Example request:  DELETE localhost:3000/api/customAPI/deleteAPI with payload {"apiKey": "prestigeBot.ccf601ec175dc4265a3eb2f835a5b46367dcc90a5dcab8b38dc58baee9e8f9686bd73ff392781b35c63728", "userID": "6491028eb963d3a07390873e"}

  const { success, message } = await apiKeyController.deleteAPIKey(apiKey, userID);

  if (success) {
    return res.status(200).json({ success, message: 'API key deleted.' });
  }

  return res.status(500).json({ success: false, message });
});

router.patch('/refreshAPIKey', async (req, res) => {
  // Example request:  PATCH localhost:3000/api/customAPI/refreshApiKey with payload {"apiKey": "prestigeBot.bab1f6759e309aaa200279be0cb8677bf42a0bc5da08731c349e6b31c2a16e04ccd45c874b741e38094d02e2b9663bd901c", "userID": "6491028eb963d3a07390873e"}
  const { apiKey, userID } = req.body;

  const { success, message } = await apiKeyController.refreshAPIKey(apiKey, userID);

  if (success) {
    return res.status(200).json({ success, message: 'API key refreshed.' });
  }

  return res.status(500).json({ success: false, message });
});

module.exports = router;

