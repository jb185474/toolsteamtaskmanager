let mongo = require('mongodb');
const client = mongo.MongoClient;
const url = 'mongodb://127.0.0.1:27017';

function insertToDb(data) {
    client.connect(url, { useNewUrlParser: true }, (err, client) => {

        //var taskData = JSON.parse(data);
        if (err) throw err;
    
        const db = client.db("toolsTeamTasks");
    
        db.collection("tasks").insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            client.close();
          });
    });
};

async function getAllTasks(){    
    await client.connect(url);
    const db = await client.connect(url);
    const dbo = db.db("toolsTeamTasks");
    const result = await dbo.collection("tasks").find().toArray();
    return result;
}

module.exports = {insertToDb, getAllTasks};