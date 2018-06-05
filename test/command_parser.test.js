const commandParser = require("../src/command_parser");
const parseInputFile = commandParser.parseInputFile;
const driverCommands = commandParser.driverCommands;
const tripCommands = commandParser.tripCommands;

describe("parseInputFile", () => {
  afterEach(() => {
    while (driverCommands.length) {
      driverCommands.splice(0, 1);
    }
    while (tripCommands.length) {
      tripCommands.splice(0, 1);
    }
  });

  it("should be a function", () => {
    expect(typeof parseInputFile).toBe("function");
  });

  it("should push driver commands to the driverCommands array", () => {
    const commandString = "Driver John";
    parseInputFile(commandString);
    expect(driverCommands).toEqual(["Driver John"]);
  });

  it("should push trip commands to the tripCommands array", () => {
    const commandString = "Trip John 07:15 07:45 17.3";
    parseInputFile(commandString);
    expect(tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });

  it("should push trip commands to both the driverCommands and tripCommands arrays", () => {
    const commandString = "Driver John\nTrip John 07:15 07:45 17.3";
    parseInputFile(commandString);
    expect(driverCommands).toEqual(["Driver John"]);
    expect(tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });

  it("should ignore extra spaces at the beginning or end of each command", () => {
    const commandString = " Driver John   \nTrip John 07:15 07:45 17.3     ";
    parseInputFile(commandString);
    expect(driverCommands).toEqual(["Driver John"]);
    expect(tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });

  it("should ignore extra line breaks at the end of the the input file", () => {
    const commandString = " Driver John\nTrip John 07:15 07:45 17.3\n\n\n";
    parseInputFile(commandString);
    expect(driverCommands).toEqual(["Driver John"]);
    expect(tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });
});
