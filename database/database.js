// Example input file:
// Driver Dan
// Driver Alex
// Driver Bob
// Trip Dan 07:15 07:45 17.3
// Trip Dan 06:12 06:32 21.8
// Trip Alex 12:01 13:16 42.0

// Database created from example input file:
// {
//   Dan: { name: 'Dan', time: 0.8333333333333333, miles: 39.1 },
//   Alex: { name: 'Alex', time: 1.25, miles: 42 },
//   Bob: { name: 'Bob', time: 0, miles: 0 }
//   }

const database = {};

module.exports = database;
