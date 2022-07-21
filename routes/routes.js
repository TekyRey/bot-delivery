const express = require("express");
const router = express.Router();

const {
  deliveries,
  createDelivery,
  paginateDeliveries,
  deliveryById,
} = require("../api/deliveries");
const {
  bots,
  createBot,
  botById,
  assignBot,
} = require("../api/bots");

/**
 * @swagger
 * components:
 *   schemas:
 *     Bot:
 *       type: object
 *       required:
 *         - id
 *         - status
 *         - zone_id
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: bot id
 *         location:
 *           type: geopoint
 *           description: bot location
 *         status:
 *           type: string
 *           description: bot status
 *         zone_id:
 *           type: string
 *           description: bot zone_id
 *       example:
 *         id: bot-3
 *         status: busy
 *         zone_id: zone-3
 *         location: {
 *          latitude: -37.814,
 *          longitude: 144.96332
 *          }
 *     Delivery:
 *       type: object
 *       required:
 *         - id
 *         - creation_date
 *         - state
 *         - dropoff
 *         - pickup
 *         - zone_id
 *       properties:
 *        id:
 *          type: string
 *          description: delivery id
 *        creation_date:
 *          type: timestamp
 *          description: delivery creation date
 *        state:
 *          type: string
 *          description: delivery state
 *        dropoff:
 *          type: geopoint
 *          description: delivery dropoff
 *        pickup:
 *          type: geopoint
 *          description: delivery pickup
 *        zone_id:
 *          type: string
 *          description: delivery zone_id
 *       example:
 *        id: delivery-3
 *        creation_date: {
 *         seconds: 1564897000,
 *         nanoseconds: 0
 *         }
 *        state: pending
 *        dropoff: {
 *         latitude: -37.814,
 *         longitude: 144.96332
 *         }
 *        pickup: {
 *         latitude: -37.814,
 *         longitude: 144.96332
 *         }
 *        zone_id: zone-3
 */

/**
 * @swagger
 * tags:
 *   name: Bots
 *   description: Bots management
 */

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: Deliveries management
 */

router.get("/bots", bots);
router.post("/bots", createBot);
router.get("/bots/:zone_id", botById);
router.get("/assignbot", assignBot);

/**
 * @swagger
 * /api/bots:
 *  get:
 *   summary: Get all bots
 *   tags: [Bots]
 *   responses:
 *    '200':
 *     description: A list of bots
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Bot'
 */

/**
 * @swagger
 * /api/bots/{zone_id}:
 *  get:
 *     summary: Get the bot by id
 *     tags: [Bots]
 *     parameters:
 *       - in: path
 *         name: zone_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bot'
 *       404:
 *         description: The book was not found
 */


/**
 * @swagger
 * /api/bots/{zone_id}:
 *  get:
 *     summary: Get the bot by id
 *     tags: [Bots]
 *     parameters:
 *       - in: path
 *         name: zone_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bot'
 *       404:
 *         description: The book was not found
 */

/**
 * @swagger
 * /api/bots:
 *  post:
 *   summary: Create a new bot
 *   tags: [Bots]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Bot'
 *   responses:
 *    200:
 *     description: A list of bots
 *     content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/Bot'
 *    404:
 *     description: The bot was not found
 */

/**
 * @swagger
 * /api/assignbot:
 *  get:
 *   summary: Assign bot to delivery
 *   tags: [Bots]
 *   responses:
 *    '200':
 *      description: Assign bot to delivery
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/Delivery'
 *    404:
 *     description: An error occured while assigning bot
 */



router.get("/deliveries", deliveries);
router.post("/deliveries", createDelivery);
router.get("/deliveries/:id", deliveryById);
router.get("/deliveries", paginateDeliveries);

/**
 * @swagger
 * /api/deliveries/{id}:
 *  get:
 *     summary: Get the delivery by id
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The delivery id
 *     responses:
 *       200:
 *         description: The delivery description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: The delivery was not found
 */

/**
 * @swagger
 * /api/deliveries:
 *  post:
 *   summary: Create a new delivery
 *   tags: [Deliveries]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Delivery'
 *   responses:
 *    200:
 *     description: A list of deliveries
 *     content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/Delivery'
 *    404:
 *     description: The delivery was not found
 */

/**
 * @swagger
 * /api/deliveries?pageSize=10&pageNumber=1:
 *  get:
 *   summary: Get all deliveries paginated
 *   tags: [Deliveries]
 *  responses:
 *   '200':
 *    description: A list of deliveries
 *    content:
 *     application/json:
 *      schema:
 *       type: array
 *      items:
 *       $ref: '#/components/schemas/Delivery'
 *   404:
 *    description: An error occured while getting deliveries
 */

/**
 * @swagger
 * /api/assignbot:
 *  get:
 *   summary: Assign bot to nearest pick up
 *   tags: [Bots]
 *   responses:
 *    '200':
 *      description: A list of pending deliveries
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/Delivery'
 *    404:
 *     description: An error occured while getting pending deliveries
 */
module.exports = router;
