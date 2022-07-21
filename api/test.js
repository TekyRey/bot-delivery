const { db } = require("../util/admin");

import {
  deliveries,
  createDelivery,
  deliveryById,
  paginateDeliveries,
} from "./deliveries.js";
// mock firebase collection
import * as admin from 'firebase-admin';
// const update = jest.fn();
// const doc = jest.fn(() => ({update}));
// const collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue((({ doc } as unknown) as any);

// fix timeout error
jest.setTimeout(10000);
// fix Cannot read property 'status' of undefined error
jest.mock("../util/admin");

// fix TypeError: Cannot read property 'status' of undefined
jest.mock("../util/admin", () => ({
    db: {
        collection: jest.fn().mockReturnValue({
            get: jest.fn().mockReturnValue({
                docs: [
                    {
                        data: () => ({
                            id: "1",
                            zone_id: "Kenya",
                            state: "pending",
                            dropoff: {
                                _latitude: 0,
                                _longitude: 0,
                            },
                            pickup: {
                                _longitude: 0,
                                _latitude: 0,
                            },
                        }),
                    },
                ],
            }),
        }),
    },
}));

// test create delivery function from index.js
describe("createDelivery", () => {
  it("should create a delivery", async () => {
    const data =  {
    "id": "1",
    "zone_id": "Kenya",
    "pickup": {
      "_latitude": 28,
      "_longitude": 19
    },
    "creation_date": {
      "_seconds": 1658319782,
      "_nanoseconds": 546000000
    },
    "dropoff": {
      "_latitude": 40,
      "_longitude": 26
    },
    "state": "pending"
  };
    const res = await createDelivery(data);
    expect(res).toEqual({ msg: "success" });
  }
  );
}
);

// // test deliveryById endpoint
// describe("deliveryById", () => {
//   test("should return delivery by id", () => {
//     const res = deliveryById("5e9f8f8f8f8f8f8f8f8f8f8");
//     expect(res).toEqual({
//       id: "5e9f8f8f8f8f8f8f8f8f8f8",
//       creation_date: {
//         _seconds: 1658319782,
//         _nanoseconds: 546000000,
//       },
//       zone_id: "Kenya",
//       state: "pending",
//       dropoff: {
//         _latitude: 0,
//         _longitude: 0,
//       },
//       pickup: {
//         _longitude: 0,
//         _latitude: 0,
//       },
//     });
//   }
//   );
// }
// );

// // test a post endpoint with firebase collection
// describe("create deliveries", () => {
//   test("add delivery to firebase delivery collection") => {
//     const res = createDelivery({
//       zone_id: "Kenya",
//       state: "pending",
//       dropoff: {
//         _latitude: 0,
//         _longitude: 0,
//       },
//       pickup: {
//         _longitude: 0,
//         _latitude: 0,
//       },
//     });
//     expect(res).toEqual({ msg: "success" });
//   }
// }
// );

