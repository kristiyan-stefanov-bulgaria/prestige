const express = require('express');
const router = express.Router();

const axios = require('axios');
const helpers = require('../helpers/helper');

const dummyCustomerData = {
    "customer": {
        "username": "admin",
        "password": "admin",
        "email": "test@example.com",
        "customAPI": {
          "receiveAccountsURL": "http://localhost:3000/api/customer/receive"
        },
        "accounts": [
            {
              "username": "firstAccount",
              "password": "admin",
              "level": 10,
              "BE": 30000,
                "email": "firstAccount@example.com"
            },
            {
              "username": "secondAccount",
              "password": "test",
              "level": 25,
              "BE": 45000,
              "email": "secondAccount@example.com"
            },
            {
              "username": "thirdAccount",
              "password": "test",
              "level": 10,
              "BE": 5000,
              "email": "thirdAccount@example.com"
            }
        ]
    }
}

router.get('/', async function(req, res, next) {
  // Fetch customer data from the database ( customer ID will be passed as a query parameter )
  // Example:  connection.query("SELECT * FROM customer WHERE `id` = `1`", function(err, results, fields) { } );

  const customer = dummyCustomerData.customer;
  let filteredAccounts = customer.accounts;

  // Filter accounts based any criteria, such as level, skins, etc.
  if (req.query.filters) {
    const filters = helpers.validateFilters(req.query.filters);
    // In this example we are filtering accounts based on level and BE essence

    if (Object.keys(filters).length > 0) {
      filteredAccounts = filteredAccounts.filter(account => {
        return Object.keys(filters).every(key => {
          return account[key] >= filters[key];
        });
      });
    }
  }

  //Send the filtered accounts to the client
  axios.get(customer.customAPI.receiveAccountsURL, {
    params: {
      accounts: filteredAccounts
    }
  }).catch(error => {
    console.error('Error sending filtered accounts to client: ', error);
  });

  res.sendStatus(200);
});

module.exports = router;
