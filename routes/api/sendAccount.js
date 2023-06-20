const express = require('express');
const router = express.Router();

const axios = require('axios');
const helpers = require('../../helpers/helper');

const { User } = require('../../models');

router.get('/test', async function(req, res, next) {
  let userDoc = new User({
    name: "Bambi",
    password: "MRPrestigeCodeIsSus",
    accounts: [{
      "id": 18036,
      "user_id": 34,
      "list_profile_id": 299,
      "storage_profile_id": null,
      "mac_address": null,
      "last_request_time": null,
      "RotationGames": 0,
      "ReachRotationGames": 2,
      "TimeoutValue": 1190,
      "MaxLevel": 30,
      "MinBlueEssence": 0,
      "EloRank": null,
      "ReachEloRank": null,
      "ListName": null,
      "Status": "Offline",
      "Priority": 0,
      "PlayType": null,
      "FlashKey": "D",
      "Games": 35,
      "PlayingCountry": "fin",
      "Username": "das",
      "Password": "asd",
      "Region": "EUW",
      "SummonerName": "asd",
      "CapsuleAccount": 0,
      "Level": 14,
      "BlueEssence": 13400,
      "RiotPoints": 0,
      "OrangeEssence": null,
      "CreationDate": "16_10_2022",
      "BirthDate": "18_04_1996",
      "CreationIP": "142.202.220.242",
      "FirstGameDate": "2023-05-14 03:56:23",
      "LastGameDate": null,
      "CreationEmail": "asa@perfectpen.com",
      "SkinShards": null,
      "Gemstone": null,
      "Chest": null,
      "Key": null,
      "ClaimedMissions": ['Daily Mission 1','Daily Mission 2'],
      "MetaData": null
    }]
  });

  await userDoc.save();

  const user = await User.find();

  res.send(JSON.stringify(user));
});

// const dummyCustomerData = {
//     "customer": {
//         "username": "admin",
//         "password": "admin",
//         "email": "test@example.com",
//         "customAPI": {
//           "receiveAccountsURL": "http://localhost:3000/api/customer/receive"
//         },
//         "accounts": [
//             {
//               "username": "firstAccount",
//               "password": "admin",
//               "level": 10,
//               "BE": 30000,
//                 "email": "firstAccount@example.com"
//             },
//             {
//               "username": "secondAccount",
//               "password": "test",
//               "level": 25,
//               "BE": 45000,
//               "email": "secondAccount@example.com"
//             },
//             {
//               "username": "thirdAccount",
//               "password": "test",
//               "level": 10,
//               "BE": 5000,
//               "email": "thirdAccount@example.com"
//             }
//         ]
//     }
// }

// router.get('/', async function(req, res, next) {
//   // Fetch customer data from the database ( customer ID will be passed as a query parameter )
//   // Example:  connection.query("SELECT * FROM customer WHERE `id` = `1`", function(err, results, fields) { } );

//   const customer = dummyCustomerData.customer;
//   let filteredAccounts = customer.accounts;

//   // Filter accounts based any criteria, such as level, skins, etc.
//   if (req.query.filters) {
//     const filters = helpers.validateFilters(req.query.filters);
//     // In this example we are filtering accounts based on level and BE essence

//     if (Object.keys(filters).length > 0) {
//       filteredAccounts = filteredAccounts.filter(account => {
//         return Object.keys(filters).every(key => {
//           return account[key] >= filters[key];
//         });
//       });
//     }
//   }

//   //Send the filtered accounts to the client
//   axios.get(customer.customAPI.receiveAccountsURL, {
//     params: {
//       accounts: filteredAccounts
//     }
//   }).catch(error => {
//     console.error('Error sending filtered accounts to client: ', error);
//   });

//   res.sendStatus(200);
// });

module.exports = router;
