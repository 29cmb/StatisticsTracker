
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config()
const uri = `mongodb+srv://${process.env.DATABASEUSER}:${process.env.DATABASEPASS}@${process.env.DATABASEURI}/?retryWrites=true&w=majority&appName=${process.env.DATABASEAPPNAME}`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = {
    uri,
    client,
    databases: {},
    collections: {},
    async init() {
      try {
        await client.connect();

        // assign databases
        this.databases.stats = client.db(process.env.STATSDATABASE);
        this.collections.categories = this.databases.stats.collection(process.env.CATEGORIESCOLLECTION);
        this.collections.data = this.databases.stats.collection(process.env.DATACOLLECTION);

        this.databases.stats.command({ ping: 1 });
        console.log("🏓 | Pinged the stats database!") 
        console.log("🎉 | All databases have been pinged and are online!") 
      } catch (error) {
        console.log("❌ | Failed to initialize database connections:", error);
      }
    }
}
