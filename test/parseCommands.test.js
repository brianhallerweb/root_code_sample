const parseCommands = require("../original_approach/parseCommands");

describe("parseCommands", () => {
  it("should return an array of driver commands", () => {
    const commandString = "Driver John";
    const result = parseCommands(commandString);
    expect(result.driverCommands).toEqual(["Driver John"]);
  });

  it("should return an array of trip commands", () => {
    const commandString = "Trip John 07:15 07:45 17.3";
    const result = parseCommands(commandString);
    expect(result.tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });

  it("should ignore extra spaces at the beginning or end of each command", () => {
    const commandString = " Driver John   \nTrip John 07:15 07:45 17.3     ";
    const result = parseCommands(commandString);
    expect(result.driverCommands).toEqual(["Driver John"]);
    expect(result.tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });

  it("should ignore extra line breaks at the end of the the input file", () => {
    const commandString = " Driver John\nTrip John 07:15 07:45 17.3\n\n\n";
    const result = parseCommands(commandString);
    expect(result.driverCommands).toEqual(["Driver John"]);
    expect(result.tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });
});
