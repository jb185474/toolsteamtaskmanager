let mongo = require('mongodb').MongoClient;
let path = require('path');
let bodyParser = require('body-parser');

const express = require( "express" );
const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended:true}));

app.post('/tm', (req, res) => {
    console.log("output" + path.join(__dirname, 'dist'));
    console.log('hit post!');
    console.log(req.body);
    console.log(req.query.action);
    res.sendStatus(200);
});

app.use("/", express.static('../taskManager/dist/taskManager/'));

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );