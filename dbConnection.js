const { MongoClient } = require('mongodb');

async function isMongoConnected(uri) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        await client.db().admin().ping();
        console.log("MongoDB is connected");
        return true;
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        return false;
    } finally {
        await client.close();
    }
}

module.exports = { isMongoConnected };
