const { isMongoConnected } = require('./dbConnection');

const mongoUri = 'mongodb+srv://amhr2606283:leap786786@cluster0.9xdgi.mongodb.net/'; // Replace with your actual MongoDB URI

async function checkMongoConnection() {
    const isConnected = await isMongoConnected(mongoUri);
    if (isConnected) {
        console.log("MongoDB connection is successful.");
    } else {
        console.log("MongoDB connection failed.");
    }
}

checkMongoConnection();

// ...existing code...
