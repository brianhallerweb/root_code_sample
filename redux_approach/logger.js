const store = require("./store/store");

function sortStore(state) {
  return Object.values(state.getState()).sort((a, b) => b.miles - a.miles);
}

function mph(miles, time) {
  return Math.round(miles / time);
}

function strOutput(state) {
  const sortedDatabase = sortStore(state);
  const outputArr = [];
  sortedDatabase.forEach(driver => {
    if (!driver.miles) {
      outputArr.push(`${driver.name}: 0 miles\n`);
    } else {
      outputArr.push(
        `${driver.name}: ${Math.round(driver.miles)} miles @ ${Math.round(
          mph(driver.miles, driver.time)
        )} mph\n`
      );
    }
  });
  return `\nDriving history report:\n\n${outputArr.join("")}`;
}

module.exports = strOutput;
