const express = require("express");
const serverless = require("serverless-http");
const request = require('request-promise');
const cors = require('cors');

const app = express();
const router = express.Router();

router.get("/init/:amount/:buy_order/:session_id", (req, res) => {
  const options = {
    method: 'POST',
    uri: 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions',
    body: {
      "buy_order": req.params.buy_order,
      "session_id": req.params.session_id,
      "amount": req.params.amount,
      "return_url": "https://tuttifruti-46344.web.app/PostCompra"
    },
    json: true,
    headers: {
        "Tbk-Api-Key-Id": "597055555532",
        "Tbk-Api-Key-Secret": "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C",
        "Content-Type": 'application/json'
    }
  }
  request(options).then(function (response){
      res.status(200).json(response);
  })
  .catch(function (err) {
      console.log(err);
  })
});

router.get("/confirm/:token", (req, res) => {
  const options = {
    method: 'PUT',
    uri: 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/'+req.params.token,
    body:{},
    json: true,
    headers: {
        "Tbk-Api-Key-Id": "597055555532",
        "Tbk-Api-Key-Secret": "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C",
        "Content-Type": 'application/json'
    }
  }
  request(options).then(function (response){
      res.status(200).json(response);
  })
  .catch(function (err) {
      console.log(err);
  })
});

app.use(cors());
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
