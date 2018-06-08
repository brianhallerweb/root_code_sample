const strOutput = require("../original_approach/logger");

const database1 = {
  Dan: { name: "Dan", time: 0.8333333333333333, miles: 39.1 },
  Alex: { name: "Alex", time: 1.25, miles: 42 }
};
const database2 = {
  Dan: { name: "Dan", time: 0.8333333333333333, miles: 39.1 },
  Alex: { name: "Alex", time: 1.25, miles: 42 },
  Bob: { name: "Bob", time: 0, miles: 0 }
};

describe("logOutput", () => {
  it("should return the correct output string", () => {
    const result = strOutput(database1);
    expect(result).toBe(
      "\nDriving history report:\n\nAlex: 42 miles @ 34 mph\nDan: 39 miles @ 47 mph\n"
    );
  });

  it("should return the correct output string for drivers with 0 miles", () => {
    const result = strOutput(database2);
    expect(result).toBe(
      "\nDriving history report:\n\nAlex: 42 miles @ 34 mph\nDan: 39 miles @ 47 mph\nBob: 0 miles\n"
    );
  });
});
