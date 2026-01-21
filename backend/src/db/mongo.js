const mongoose = require('mongoose');

let isConnected = false;

async function connect(uri) {
  if (isConnected) return mongoose.connection;
  if (!uri) throw new Error('MONGODB_URI not provided');
  await mongoose.connect(uri, { 
    dbName: 'freshmart',
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000
  });
  isConnected = true;
  return mongoose.connection;
}

function connected() { return isConnected; }

module.exports = { connect, connected, mongoose };
