const createDrivingRecords = require("../functional_like_approach/trip_recorder");

let database = {};
afterEach(() => {
  database = {};
});

describe("createDrivingRecords", () => {
  it("should record new driver records", () => {
    const commandString = "Driver John";
    createDrivingRecords(commandString, database);
    expect(database).toHaveProperty("John.name", "John");
    expect(database).toHaveProperty("John.miles", 0);
    expect(database).toHaveProperty("John.time", 0);
  });

  it("should record new trip records", () => {
    const commandString = "Driver John\nTrip John 07:15 07:45 17.3";
    createDrivingRecords(commandString, database);
    expect(database).toHaveProperty("John.name", "John");
    expect(database).toHaveProperty("John.miles", 17.3);
    expect(database).toHaveProperty("John.time", 0.5);
  });

  it("should ignore extra spaces at the beginning or end of each command", () => {
    const commandString = " Driver John   \nTrip John 07:15 07:45 17.3     ";
    createDrivingRecords(commandString, database);
    expect(database).toHaveProperty("John.name", "John");
    expect(database).toHaveProperty("John.miles", 17.3);
    expect(database).toHaveProperty("John.time", 0.5);
  });

  it("should ignore extra line breaks at the end of the the input file", () => {
    const commandString = " Driver John\nTrip John 07:15 07:45 17.3\n\n\n";
    createDrivingRecords(commandString, database);
    expect(database).toHaveProperty("John.name", "John");
    expect(database).toHaveProperty("John.miles", 17.3);
    expect(database).toHaveProperty("John.time", 0.5);
  });

  it("should accumulate miles and time for multiple trip records", () => {
    const commandString =
      "Driver John\nTrip John 07:15 07:45 17.3\nTrip John 07:15 07:45 17.3";
    createDrivingRecords(commandString, database);
    expect(database).toHaveProperty("John.name", "John");
    expect(database).toHaveProperty("John.miles", 34.6);
    expect(database).toHaveProperty("John.time", 1);
  });
});
