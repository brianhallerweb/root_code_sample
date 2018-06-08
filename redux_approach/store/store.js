const { createStore } = require("redux");

const store = createStore((state = {}, action) => {
  switch (action.type) {
    case "CreateDriver":
      return Object.assign({}, state, {
        [action.name]: { name: action.name, miles: 0, time: 0 }
      });
    case "CreateTrip":
      return Object.assign({}, state, {
        [action.name]: {
          name: action.name,
          miles: state[action.name].miles + action.miles,
          time: state[action.name].time + action.time
        }
      });
    default:
      return state;
  }
});

module.exports = store;
