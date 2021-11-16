let path = require('path');
let dbservice = require('./services/databaseService');

const express = require( "express" );
const app = express();
const port = 8080; // default port to listen

app.use(express.json());

app.post('/tm', (req, res) => {
    console.log("output" + path.join(__dirname, 'dist'));
    console.log('hit post!');
    console.log(req.body);
    console.log(req.query.action);

    dbservice.insertToDb(req.body);
    

    res.sendStatus(200);
});

app.get('/getAllRecords', async(req, res) => {
    console.log("Here");
    
    try{
        const records = await dbservice.getAllTasks();
        res.statusCode = "200";
        res.json(records);    
    }
    catch(error){
        console.log(error);
    }
    
});

app.get('/getSingleRecord', async(req, res) => {
    console.log("Here");
    let id = req.query.id;
    try{
        console.log("id = " + id);
        const records = await dbservice.getSingleRecord(id);
        res.statusCode = "200";
        res.json(records);    
    }
    catch(error){
        console.log(error);
    }
    
});

app.post('/addNewUser', async(req, res) => {
    try{
        console.log("id = " + id);
        const records = await dbservice.getSingleRecord(id);
        res.statusCode = "200";
        res.json(records);    
    }
    catch(error){
        console.log(error);
    }
    
});

app.use("/", express.static('../taskManager/dist/taskManager/'));

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
    
    
} );


