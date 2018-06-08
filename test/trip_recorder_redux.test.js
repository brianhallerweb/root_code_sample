const createDrivingRecords = require("../redux_approach/trip_recorder");
const store = require("../redux_approach/store/store");

describe("createDrivingRecords", () => {
  it("should record new driver records", () => {
    const commandString = "Driver John";
    createDrivingRecords(commandString);
    expect(store.getState()).toHaveProperty("John.name", "John");
    expect(store.getState()).toHaveProperty("John.miles", 0);
    expect(store.getState()).toHaveProperty("John.time", 0);
  });

  it("should record new trip records", () => {
    const commandString = "Driver John\nTrip John 07:15 07:45 17.3";
    createDrivingRecords(commandString);
    expect(store.getState()).toHaveProperty("John.name", "John");
    expect(store.getState()).toHaveProperty("John.miles", 17.3);
    expect(store.getState()).toHaveProperty("John.time", 0.5);
  });

  it("should ignore extra spaces at the beginning or end of each command", () => {
    const commandString = " Driver John   \nTrip John 07:15 07:45 17.3     ";
    createDrivingRecords(commandString);
    expect(store.getState()).toHaveProperty("John.name", "John");
    expect(store.getState()).toHaveProperty("John.miles", 17.3);
    expect(store.getState()).toHaveProperty("John.time", 0.5);
  });

  it("should ignore extra line breaks at the end of the the input file", () => {
    const commandString = " Driver John\nTrip John 07:15 07:45 17.3\n\n\n";
    createDrivingRecords(commandString);
    expect(store.getState()).toHaveProperty("John.name", "John");
    expect(store.getState()).toHaveProperty("John.miles", 17.3);
    expect(store.getState()).toHaveProperty("John.time", 0.5);
  });

  it("should accumulate miles and time for multiple trip records", () => {
    const commandString =
      "Driver John\nTrip John 07:15 07:45 17.3\nTrip John 07:15 07:45 17.3";
    createDrivingRecords(commandString);
    expect(store.getState()).toHaveProperty("John.name", "John");
    expect(store.getState()).toHaveProperty("John.miles", 34.6);
    expect(store.getState()).toHaveProperty("John.time", 1);
  });
});
