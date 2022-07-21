const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const {
  deliveries,
  createDelivery,
  paginateDeliveries,
  deliveryById,
} = require("./api/deliveries");
const {
  bots,
  createBot,
  botById,
  getPendingDeliveries,
} = require("./api/bots");


app.get("/deliveries", deliveries);
app.post("/deliveries", createDelivery);
app.get("/deliveries/:id", deliveryById);
app.get("/deliveries/paginate", paginateDeliveries);
// get deliveries paginated sample url
// http://localhost:5000/deliveries/paginate?pageSize=10&pageNumber=1
// get delivery by id sample url
// http://localhost:5000/deliveries/5e9f8f8f8f8f8f8f8f8f8f8

// get bots
app.get("/bots", bots);
app.post("/bots", createBot);
app.get("/bots/:zone_id", botById);

// get pending deliveries
app.get("/pendingdeliveries", getPendingDeliveries);
app.listen(4000, () => {
    console.log('listening on port 4000')
})