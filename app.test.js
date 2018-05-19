const importedIndex = require("./app");
const commands = importedIndex.commands;
const drivers = importedIndex.drivers;
const Driver = importedIndex.Driver;

describe("parseInputFile", () => {
  afterEach(() => {
    commands.driverCommands = [];
    commands.tripCommands = [];
  });

  it("should be a function", () => {
    expect(typeof commands.parseInputFile).toBe("function");
  });

  it("should push driver commands to the driverCommands array", () => {
    const commandString = "Driver John";
    commands.parseInputFile(commandString);
    expect(commands.driverCommands).toEqual(["Driver John"]);
  });

  it("should push trip commands to the tripCommands array", () => {
    const commandString = "Trip John 07:15 07:45 17.3";
    commands.parseInputFile(commandString);
    expect(commands.tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });

  it("should push trip commands to both the driverCommands and tripCommands arrays", () => {
    const commandString = "Driver John\nTrip John 07:15 07:45 17.3";
    commands.parseInputFile(commandString);
    expect(commands.driverCommands).toEqual(["Driver John"]);
    expect(commands.tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });

  it("should ignore extra spaces at the beginning or end of each command", () => {
    const commandString = " Driver John   \nTrip John 07:15 07:45 17.3     ";
    commands.parseInputFile(commandString);
    expect(commands.driverCommands).toEqual(["Driver John"]);
    expect(commands.tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });

  it("should ignore extra line breaks at the end of the the input file", () => {
    const commandString = " Driver John\nTrip John 07:15 07:45 17.3\n\n\n";
    commands.parseInputFile(commandString);
    expect(commands.driverCommands).toEqual(["Driver John"]);
    expect(commands.tripCommands).toEqual(["Trip John 07:15 07:45 17.3"]);
  });
});

describe("executeDriverCommands", () => {
  afterEach(() => {
    drivers.database = {};
  });

  it("should be a function", () => {
    expect(typeof commands.executeDriverCommands).toBe("function");
  });

  it("should put new Driver instances with name properties into the database", () => {
    commands.driverCommands = ["Driver A", "Driver B", "Driver C"];
    commands.executeDriverCommands();
    expect(drivers.database.A).toBeInstanceOf(Driver);
    expect(drivers.database.A.name).toBe("A");
    expect(drivers.database.B).toBeInstanceOf(Driver);
    expect(drivers.database.B.name).toBe("B");
    expect(drivers.database.C).toBeInstanceOf(Driver);
    expect(drivers.database.C.name).toBe("C");
  });
});

describe("executeTripCommands", () => {
  afterEach(() => {
    drivers.database = {};
  });
  it("should be a function", () => {
    expect(typeof commands.executeTripCommands).toBe("function");
  });

  it("should accumulate the total number of miles and time per driver", () => {
    commands.driverCommands = ["Driver Dan"];
    commands.executeDriverCommands();
    commands.tripCommands = ["Trip Dan 07:15 07:45 17.3"];
    commands.executeTripCommands();
    expect(drivers.database.Dan).toEqual({
      name: "Dan",
      time: 0.5,
      miles: 17.3
    });
    commands.executeTripCommands();
    expect(drivers.database.Dan).toEqual({ name: "Dan", time: 1, miles: 34.6 });
  });
});

describe("calculateTime", () => {
  it("should be a function", () => {
    expect(typeof commands.calculateTime).toEqual("function");
  });

  it("should return the hour difference between two times (hh:mm on a 24 hour clock)", () => {
    expect(commands.calculateTime("01:00", "2:00")).toBe(1);
    expect(commands.calculateTime("01:00", "1:30")).toBe(0.5);
    expect(commands.calculateTime("01:00", "1:00")).toBe(0);
    expect(commands.calculateTime("01:00", "12:30")).toBe(11.5);
    expect(commands.calculateTime("07:00", "9:30")).toBe(2.5);
  });
});

describe("sortDatabase", () => {
  afterEach(() => {
    drivers.database = {};
    drivers.sortedDatabase = [];
  });
  it("should be a function", () => {
    expect(typeof drivers.sortDatabase).toEqual("function");
  });

  it("should sort the database by miles", () => {
    commands.driverCommands = ["Driver Dan", "Driver John"];
    commands.executeDriverCommands();
    commands.tripCommands = [
      "Trip Dan 07:15 07:45 17.3",
      "Trip John 07:15 07:45 20.3"
    ];
    commands.executeTripCommands();
    drivers.sortDatabase();
    expect(drivers.sortedDatabase).toEqual([
      { name: "John", time: 0.5, miles: 20.3 },
      { name: "Dan", time: 0.5, miles: 17.3 }
    ]);
  });
});

describe("logOutput", () => {
  afterEach(() => {
    drivers.database = {};
    drivers.sortedDatabase = [];
  });

  it("should be a function", () => {
    expect(typeof drivers.logOutput).toEqual("function");
  });

  it("should return the correct output string", () => {
    commands.driverCommands = ["Driver Dan", "Driver John"];
    commands.executeDriverCommands();
    commands.tripCommands = [
      "Trip Dan 07:15 07:45 17.3",
      "Trip John 07:15 07:45 20.3"
    ];
    commands.executeTripCommands();
    drivers.sortDatabase();
    const result = drivers.logOutput();
    expect(result).toBe(
      "\nDriving history report:\n\nJohn: 20 miles @ 41 mph\nDan: 17 miles @ 35 mph\n"
    );
  });

  it("should return the correct output string for drivers with 0 miles", () => {
    commands.driverCommands = ["Driver Dan", "Driver John"];
    commands.executeDriverCommands();
    commands.tripCommands = ["Trip John 07:15 07:45 20.3"];
    commands.executeTripCommands();
    drivers.sortDatabase();
    const result = drivers.logOutput();
    expect(result).toBe(
      "\nDriving history report:\n\nJohn: 20 miles @ 41 mph\nDan: 0 miles\n"
    );
  });
});
