const { db } = require("../util/admin");

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

exports.assignBot = async (req, res) => {
    const deliveries = db.collection("deliveries");
    try {
        await deliveries.get().then((snapshot) => {
            const deliveriesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const bots = db.collection("bots");
            bots.get().then((snapshot) => {
                const botsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));  
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
                            nearestBot.bot.status = "busy";
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
        return res
            .status(500)
            .json({ general: "Something went wrong, please try again" });
        
    }
}
