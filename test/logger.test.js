const {
  parseInputFile,
  driverCommands,
  tripCommands
} = require("../src/command_parser");

const {
  Driver,
  executeDriverCommands,
  executeTripCommands
} = require("../src/command_executer");

const database = require("../database/database");

const logOutput = require("../src/logger");

describe("logOutput", () => {
  afterEach(() => {
    while (driverCommands.length) {
      driverCommands.splice(0, 1);
    }
    while (tripCommands.length) {
      tripCommands.splice(0, 1);
    }
    for (key in database) {
      delete database.key;
    }
  });

  it("should be a function", () => {
    expect(typeof logOutput).toEqual("function");
  });

  it("should return the correct output string", () => {
    parseInputFile(
      "Driver Dan\nDriver John\nTrip Dan 07:15 07:45 17.3\nTrip John 07:15 07:45 20.3"
    );
    executeDriverCommands();
    executeTripCommands();
    expect(logOutput()).toBe(
      "\nDriving history report:\n\nJohn: 20 miles @ 41 mph\nDan: 17 miles @ 35 mph\n"
    );
  });

  it("should return the correct output string for drivers with 0 miles", () => {
    parseInputFile("Driver Dan\nDriver John\nTrip John 07:15 07:45 20.3");
    executeDriverCommands();
    executeTripCommands();
    expect(logOutput()).toBe(
      "\nDriving history report:\n\nJohn: 20 miles @ 41 mph\nDan: 0 miles\n"
    );
  });
});
