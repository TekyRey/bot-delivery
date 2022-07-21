const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
app.use(express.json());
app.use(cors());
const deliveryRouter = require('./routes/routes');


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bot Delivery API",
      version: "1.0.0",
      description:
        "This is a sample Bot Delivery API built to manage bots and deliveries",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local server",
      }
    ],
   
  }, apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use("/api", deliveryRouter);

app.listen(4000, () => {
    console.log('listening on port 4000')
})