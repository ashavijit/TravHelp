// Empty JS object to act as endpoint for the app
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const fetch = require('node-fetch');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// 'x-forwarded-proto' header for Heroku proxy
app.get('*',function(req,res,next){

    if(req.headers['x-forwarded-proto'] != 'https'){

        res.redirect('https://' + req.headers.host + req.url)

    }else {
        next() /* Continue to other routes if not redirecting */
    }
})

//Building my own proxy
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.get('/test', function (req, res) {
    res.send({
        'title': 'test json response',
        'message': 'testing mockApi',
        'time': 'now'
    })
})

//** Main GET route **//
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

//** default GET route **//
app.get('/all', sendData);
function sendData(req, res){    
     res.send(projectData);
}

//** POST route to handle url coming from client side, call the API and send the data to client side **//
app.post('/callAPI', async (req, res) => {

    const apiUrl = req.body.urlBase;
    
    const resp = await fetch(apiUrl)

    try{ //try to send API data to client side

        const data = await resp.json();
        res.send(data);

    }catch(err) {
        
        console.log("error when calling API via server side", err);
    }
})

module.exports = app;