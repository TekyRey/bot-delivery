/**
 * @jest-environment jsdom
 */

import {
  deliveries,
  createDelivery,
  deliveryById,
    paginateDeliveries
} from "./api/deliveries.js";

// fix timeout error
jest.setTimeout(10000);

// test endpoint to create new deliveries and store them in a firebase collection using describe and test methods and stop asynchronous execution of the test
describe("deliveries", () => {
    test("should add a new delivery to the firebase collection", async () => {
        const res = await createDelivery({
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
        });
        expect(res).toEqual({ msg: "success" });
    }
    );
}
);

