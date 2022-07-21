const { db } = require("../util/admin");

// get all bots from firebase collection
exports.bots = async (req, res) => {
    const bots = db.collection("bots");
    try {
        const data = await bots.get();
        const botsData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        return res.status(201).json(botsData);
    }
    catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    }
}
    
// post bot to the firebase collection
exports.createBot = async (req, res) => {
    const bots = db.collection("bots");
    const data = req.body;
    try {
        await bots.add(data);
        return res.status(201).json({ msg: "success" });
    }
    catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    }
}

    // get bot data from firebase collection by their zone_id
exports.botById = async (req, res) => {
  const bots = db.collection("bots");
  const zone_id = req.params.zone_id;
  try {
    const data = await bots.where("zone_id", "==", zone_id).get();
    const botsData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(201).json(botsData);
  } catch (error) {
    return res

      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};


// assign available bot to a pending delivery and change bot status to busy and delivery status to assigned
// exports.assignBot = async (req, res) => {
//     const bots = db.collection("bots");
//     const deliveries = db.collection("deliveries");
//     const bot_id = req.params.id;
//     const delivery_id = req.params.id;
//     try {
//         const bot = await bots.doc(bot_id).get();
//         const delivery = await deliveries.doc(delivery_id).get();
//         const botData = {
//           id: bot.bot_id,
//           ...bot.data(),
//         };
//         const deliveryData = {
//           id: delivery.delivery_id,
//           ...delivery.data(),
//         };
//         await bots.doc(bot_id).update({
//             status: "busy",
//             id: delivery_id,
//         });
//         await deliveries.doc(delivery_id).update({
//             status: "assigned",
//         });
//         return res.status(201).json({ botData, deliveryData });
//     }
//     catch (error) {
//         return res
//             .status(500)

//             .json({ general: "Something went wrong, please try again" });
//     }
// }

// update bot status to busy where status is available in typesctipt
exports.updateBotStatus = async (req, res) => {
    const bots = db.collection("bots");
    const bot_id = req.params.id;
    const data = req.body;
    try {
        await bots.doc(bot_id).update({
            status: "busy",
        });
        return res.status(201).json({ msg: "success" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ general: "Something went wrong, please try again" });
    }
}


// exports.assignBot = async (req, res) => {
//     const bots = db.collection("bots");
//     const bot_id = req.body.id;
//     try {
//         await bots.doc(bot_id).update({
//             status: "busy",
//         });
//         return res.status(201).json({ msg: "success" });
//     }
//     catch (error) {
//         return res
//             .status(500)
//             .json({ general: "Something went wrong, please try again" });
//     }
// }


// 1. get all pending deliveries
exports.getPendingDeliveries = async (req, res) => {
    const deliveries = db.collection("deliveries");
    try {
        await deliveries.get().then((snapshot) => {
            const deliveriesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
// 2. get all bots with available status
            const bots = db.collection("bots");
            bots.get().then((snapshot) => {
                const botsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
// 3. assign bots to pending deliveries   
                const deg2rad = (deg) => {
                    return deg * (Math.PI / 180);
                }
                
                const getDistance = (lat1, lon1, lat2, lon2) => {
                    const R = 6371; // Radius of the earth in km
                    const dLat = deg2rad(lat2 - lat1); // deg2rad below
                    const dLon = deg2rad(lon2 - lon1);
                    const a =
                        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(deg2rad(lat1)) *
                        Math.cos(deg2rad(lat2)) *
                        Math.sin(dLon / 2) *
                        Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const d = R * c; // Distance in km
                    return d;
                }
               
                deliveriesData.forEach(delivery => {
                    if (delivery.status === "pending") {
                        // get nearest bot to delivery pickup location
                        if (delivery.zone_id === bots.zone_id) {

                            const nearestBot = botsData.reduce((acc, curr) => {
                                const distance = getDistance(
                                    curr.location._latitude,
                                    curr.location._longitude,
                                    delivery.pickup._latitude,
                                    delivery.pickup._longitude
                                );
                                if (distance < acc.distance) {
                                    return {
                                        bot: curr,
                                        distance: distance,
                                    };
                                }
                                return acc;
                            }, { distance: Number.MAX_VALUE });
                            // assign bot to delivery
                            nearestBot.bot.status = "busy";
                            // nearestBot.bot.delivery_id = delivery.id;
                            bots.doc(nearestBot.bot.id).update(nearestBot.bot);
                            deliveries.doc(delivery.id).update(delivery);
                        }
                    }
                });
            });
        }
        );
        return res.status(201).json({ msg: "success" });
    }
    catch (error) {
            console.log(error);

        return res
        
            .status(500)
            // // log error to console
            .json({ general: "Something went wrong, please try again" });
        
    }
}
