const commandParser = require("../src/command_parser");
const parseInputFile = commandParser.parseInputFile;
const driverCommands = commandParser.driverCommands;
const tripCommands = commandParser.tripCommands;

const commandExecuter = require("../src/command_executer");
const Driver = commandExecuter.Driver;
const executeDriverCommands = commandExecuter.executeDriverCommands;
const executeTripCommands = commandExecuter.executeTripCommands;

const database = require("../database/database");

describe("executeDriverCommands", () => {
  afterEach(() => {
    for (key in database) {
      delete database.key;
    }
  });

  it("should be a function", () => {
    expect(typeof executeDriverCommands).toBe("function");
  });

  it("should put new Driver instances with name properties into the database", () => {
    const commandString = "Driver A\nDriver B\n Driver C";
    parseInputFile(commandString);
    executeDriverCommands();
    expect(database.A).toBeInstanceOf(Driver);
    expect(database.A.name).toBe("A");
    expect(database.B).toBeInstanceOf(Driver);
    expect(database.B.name).toBe("B");
    expect(database.C).toBeInstanceOf(Driver);
    expect(database.C.name).toBe("C");
  });
});

describe("executeTripCommands", () => {
  afterEach(() => {
    for (key in database) {
      delete database.key;
    }
  });

  it("should be a function", () => {
    expect(typeof executeTripCommands).toBe("function");
  });

  it("should accumulate the total number of miles and time per driver", () => {
    parseInputFile("Driver Dan\nTrip Dan 07:15 07:45 17.3");
    executeDriverCommands();
    executeTripCommands();
    expect(database.Dan).toEqual({
      name: "Dan",
      time: 0.5,
      miles: 17.3
    });
    executeTripCommands();
    expect(database.Dan).toEqual({ name: "Dan", time: 1, miles: 34.6 });
  });

  it("should accumulate the total number of miles and time per driver", () => {
    parseInputFile("Driver Linda\nTrip Linda 05:15 07:39 27.8");
    executeDriverCommands();
    executeTripCommands();
    expect(database.Linda).toEqual({
      name: "Linda",
      time: 2.4,
      miles: 27.8
    });
  });
});
