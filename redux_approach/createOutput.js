const store = require("./store/store");

function sortStore(state) {
  return Object.values(state.getState()).sort((a, b) => b.miles - a.miles);
}

function mph(miles, time) {
  return Math.round(miles / time);
}

function createOutput(state) {
  const sortedState = sortStore(state);
  const outputArr = sortedState.map(driver => {
    if (!driver.miles) {
      return `${driver.name}: 0 miles\n`;
    } else {
      return `${driver.name}: ${Math.round(driver.miles)} miles @ ${Math.round(
        mph(driver.miles, driver.time)
      )} mph\n`;
    }
  });
  return `\nDriving history report:\n\n${outputArr.join("")}`;
}

module.exports = createOutput;
