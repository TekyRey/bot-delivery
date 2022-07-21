import { deliveries, paginateDeliveries, createDelivery, deliveryById } from "./deliveries.js";
import {
  bots,
  createBot,
  botById,
  assignBot,
} from "./bots.js";

const db = {
  collection: jest.fn(() => ({
    get: jest.fn(() => ({
      docs: [
        {
          data: () => ({
            id: 1,
            name: "test",
            address: "test",
            phone: "test",
            email: "",
            date: "test",
            time: "test",
            items: "test",
            total: "test",
            status: "test",
          }),
        },
      ],
    })),
  })),
};

const req = {
  query: {
    pageSize: 10,
    pageNumber: 1,
  },
};
const res = {
  status: jest.fn(() => res),
  json: jest.fn(() => res),
};

describe("deliveries", () => {
  test("should add a new delivery", async () => {
    // mock the db.collection function
    db.collection = jest.fn(() => ({
      add: jest.fn(() => ({
        id: "test",
      })),
    }));

    // mock the req.body function
    req.body =  {
    "state": "pending",
    "dropoff": {
      "_latitude": 0,
      "_longitude": 0
    },
    "zone_id": "Kenyas",
    "pickup": {
      "_longitude": 0,
      "_latitude": 0
    },
    "creation_date": {
      "_nanoseconds": 546000000,
      "_seconds": 1658319782
    }
  },

    // mock the res.status function
    res.status = jest.fn(() => res);

    // mock the res.json function
    res.json = jest.fn(() => res);

    // call the createDelivery function
    await createDelivery(req, res);

    // expect the status to be 201
    expect(res.status).toHaveBeenCalledWith(201);

    // expect the json to be called with the correct data
    expect(res.json).toHaveBeenCalledWith({
      "msg": "success",
    });
  }
  );
}
);

describe("deliveries", () => {
  test("should get a delivery by id", async () => {
    db.collection = jest.fn(() => ({
      where: jest.fn(() => ({
        get: jest.fn(() => ({
          docs: [
            {
              data: () => ({
                "id": "2"
              }),
            },
          ],
        })),
      })),
    }));
    req.params = {
      id: "1",
    };

    res.status = jest.fn(() => res);

    res.json = jest.fn(() => res);

    await deliveryById(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith(
      
        [
  {
    "id": "1",
    "creation_date": {
      "_seconds": 1658319782,
      "_nanoseconds": 546000000
    },
    "zone_id": "Kenya",
    "dropoff": {
      "_latitude": 40,
      "_longitude": 26
    },
    "state": "pending",
    "pickup": {
      "_latitude": 28,
      "_longitude": 19
    }
  }
] 
    
    );
    
  }
  );
}
);

describe("deliveries", () => {
  test("should get paginateDeliveries", async () => {
    // mock the db.collection function
    db.collection = jest.fn(() => ({
      where: jest.fn(() => ({
        get: jest.fn(() => ({
          docs: [
            {
              data: () => ({
                "id": "2"
              }),
            },
          ],
        })),
      })),
    }));

    // mock the passing of page size and page number
    req.query = {
      pageSize: 10,
      pageNumber: 1,
    };

    // 

    // mock the res.status function
    res.status = jest.fn(() => res);

    // mock the res.json function
    res.json = jest.fn(() => res);

    // call the getpaginateDeliveries function
    await paginateDeliveries(req, res);

    // expect the status to be 201
    expect(res.status).toHaveBeenCalledWith(201);

    // expect the json to be called with the correct data
    expect(res.json).toHaveBeenCalledWith(
      // use contains to check array data
      expect.arrayContaining(
        
                 [
  {
    "id": "1",
    "creation_date": {
      "_seconds": 1658319782,
      "_nanoseconds": 546000000
    },
    "zone_id": "Kenya",
    "dropoff": {
      "_latitude": 40,
      "_longitude": 26
    },
    "state": "pending",
    "pickup": {
      "_latitude": 28,
      "_longitude": 19
    }
  }
        ]
      )

    );
  }
  );
}
);

describe("deliveries", () => {
  test("should get all deliveries", async () => {
    // mock the db.collection function
    db.collection = jest.fn(() => ({
      where: jest.fn(() => ({
        get: jest.fn(() => ({
          docs: [
            {
              data: () => ({
                id: "2",
              }),
            },
          ],
        })),
      })),
    }));


    // mock the res.status function
    res.status = jest.fn(() => res);

    // mock the res.json function
    res.json = jest.fn(() => res);

    // call the getpaginateDeliveries function
    await deliveries(req, res);

    // expect the status to be 201
    expect(res.status).toHaveBeenCalledWith(201);

    // expect the json to be called with the correct data
    expect(res.json).toHaveBeenCalledWith(
      // use contains to check array data
      expect.arrayContaining([
        {
          id: "1",
          creation_date: {
            _seconds: 1658319782,
            _nanoseconds: 546000000,
          },
          zone_id: "Kenya",
          dropoff: {
            _latitude: 40,
            _longitude: 26,
          },
          state: "pending",
          pickup: {
            _latitude: 28,
            _longitude: 19,
          },
        },
      ])
    );
  });
});

describe("bots", () => {
  test("should get all bots", async () => {
    db.collection = jest.fn(() => ({
      where: jest.fn(() => ({
        get: jest.fn(() => ({
          docs: [
            {
              data: () => ({
                id: "2",
              }),
            },
          ],
        })),
      })),
    }));

    res.status = jest.fn(() => res);

    res.json = jest.fn(() => res);

    await bots(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        {
          id: "3",
          zone_id: "Kenya",
          status: "available",
          location: {
            _latitude: 26,
            _longitude: 17,
          },
        },
      ])
    );
  });
}
);

describe("bot by zone id", () => {
  test("should get bot by id", async () => {
    db.collection = jest.fn(() => ({
      where: jest.fn(() => ({
        get: jest.fn(() => ({
          docs: [
            {
              data: () => ({
                zone_id: "US",
              }),
            },
          ],
        })),
      })),
    }));

    req.params = {
      zone_id: "US",
    };

    res.status = jest.fn(() => res);

    res.json = jest.fn(() => res);

    await botById(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith(
     expect.arrayContaining([
        {
          id: "2",
          status: "available",
          location: {
            _latitude: 26,
            _longitude: 17,
          },
          zone_id: "US",
        },
     ]
    )
    );
  }
  );
}
);

describe("createBot", () => {
  test("should create bot", async () => {
    db.collection = jest.fn(() => ({
      add: jest.fn(() => ({
        id: "8",
      })),
    }));

    req.body = {
      zone_id: "US",
      status: "available",
      location: {
        _latitude: 26,
        _longitude: 17,
      },
    };

    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);

    await createBot(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith(
      {
        "msg": "success",
      }
    );
  }
  );
}
); 

describe("asign available bots to nearest pending deliveries", () => {
  test("should get assign bot to delivery", async () => {
    db.collection = jest.fn(() => ({
      where: jest.fn(() => ({
        get: jest.fn(() => ({
          docs: [
            {
              data: () => ({
                id: "2",
              }),
            },
          ],
        })),
      })),
    }));
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);

    await assignBot(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith(      
        {
          "msg": "success"
        }
    );
  }
  );
}
);




