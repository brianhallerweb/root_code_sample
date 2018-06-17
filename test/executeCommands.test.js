const executeCommands = require("../original_approach/executeCommands");

let drivingRecords = {};
afterEach(() => {
  drivingRecords = {};
});

describe("executeCommands", () => {
  it("should put new drivers into drivingRecords with a name property", () => {
    const commands = {
      driverCommands: ["Driver A", "Driver B", "Driver C"],
      tripCommands: []
    };
    executeCommands(commands, drivingRecords);
    expect(drivingRecords.A.name).toBe("A");
    expect(drivingRecords.B.name).toBe("B");
    expect(drivingRecords.C.name).toBe("C");
  });

  it("should record the number of miles and time for a driver", () => {
    const commands = {
      driverCommands: ["Driver Dan"],
      tripCommands: ["Trip Dan 07:15 07:45 17.3"]
    };
    executeCommands(commands, drivingRecords);
    expect(drivingRecords.Dan).toEqual({ name: "Dan", time: 0.5, miles: 17.3 });
  });

  it("should accumulate the total number of miles and time per driver", () => {
    const commands = {
      driverCommands: ["Driver Dan"],
      tripCommands: ["Trip Dan 07:15 07:45 17.3", "Trip Dan 07:15 07:45 17.3"]
    };
    executeCommands(commands, drivingRecords);
    expect(drivingRecords.Dan).toEqual({ name: "Dan", time: 1, miles: 34.6 });
  });
});
