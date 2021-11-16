let mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId; 
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
    console.log("In getAllTasks");
    const dbo = await openDbConnection();
    const result = await dbo.collection("tasks").find().toArray();
    return result;
}

async function getSingleRecord(id){    
    const dbo = await openDbConnection();
    const query = {"_id": ObjectId(id)};
    console.log(query);
    const result = await dbo.collection("tasks").findOne(query);
    return result;
}

async function addNewUser(data){    
    const dbo = await openDbConnection();
    const result = await dbo.collection("users").insertOne(data);
    client.close();
    return result;
}

async function getAllUsers(){    
    const dbo = await openDbConnection();
    const result = await dbo.collection("users").find();
    client.close();
    return result;
}

async function getOpentasksForUser(userId){    
    const dbo = await openDbConnection();
    const query = {"userId": userId, "complete": false};
    const result = await dbo.collection("userTasks").find();
    client.close();
    return result;
}

async function setTaskCompletion(userId, taskId, value){    
    const dbo = await openDbConnection();
    const where = {"userId": userId, "taskId": taskId};
    const update = {$set:{"complete": value}};
    const result = await dbo.collection("userTasks").updateOne(where,update);
    client.close();
    return result;
}

async function openDbConnection(){
    await client.connect(url);
    const db = await client.connect(url);
    const dbo = db.db("toolsTeamTasks");
    return dbo;
}

module.exports = {insertToDb, getAllTasks, getSingleRecord, addNewUser, getAllUsers, getOpentasksForUser, setTaskCompletion};