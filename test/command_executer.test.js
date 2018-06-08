const executeCommands = require("../original_approach/command_executer");

let database = {};
afterEach(() => {
  database = {};
});

describe("executeCommands", () => {
  it("should put new drivers into the database with a name property", () => {
    const commands = {
      driverCommands: ["Driver A", "Driver B", "Driver C"],
      tripCommands: []
    };
    executeCommands(commands, database);
    expect(database.A.name).toBe("A");
    expect(database.B.name).toBe("B");
    expect(database.C.name).toBe("C");
  });

  it("should record the number of miles and time for a driver", () => {
    const commands = {
      driverCommands: ["Driver Dan"],
      tripCommands: ["Trip Dan 07:15 07:45 17.3"]
    };
    executeCommands(commands, database);
    expect(database.Dan).toEqual({ name: "Dan", time: 0.5, miles: 17.3 });
  });

  it("should accumulate the total number of miles and time per driver", () => {
    const commands = {
      driverCommands: ["Driver Dan"],
      tripCommands: ["Trip Dan 07:15 07:45 17.3", "Trip Dan 07:15 07:45 17.3"]
    };
    executeCommands(commands, database);
    expect(database.Dan).toEqual({ name: "Dan", time: 1, miles: 34.6 });
  });
});
