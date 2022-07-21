const { db } = require("../util/admin");

exports.deliveries = async (req, res) => {
  const deliveries = db.collection("deliveries");
  try {
    const data = await deliveries.get();
    const deliveriesData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(201).json(deliveriesData);
  }
  catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
}

// post book to the firebase collection
exports.createDelivery = async (req, res) => {
  const deliveries = db.collection("deliveries");
  const data = req.body;
  try {
    await deliveries.add(data);
    return res.status(201).json({ msg: "success" });
  }
  catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
}

exports.deliveryById = async (req, res) => {
  const deliveries = db.collection("deliveries");
  const id = req.params.id;
  try {
    const data = await deliveries.where("id", "==", id).get();
    const deliveriesData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(201).json(deliveriesData);
  }
  catch (error) {
    return res

      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
}

// get deliveries paginated
exports.paginateDeliveries = async (req, res) => {
  const { pageSize, pageNumber } = req.query;
  const deliveries = db.collection("deliveries");
  try {
    const data = await deliveries
      .orderBy("id")
      .limit(Number(pageSize))
      .startAt(Number(pageNumber))
      .get();
    const deliveriesData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(201).json(deliveriesData);
  }
  catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
}
