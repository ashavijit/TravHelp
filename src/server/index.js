const app = require('./server')

const port = process.env.PORT || 8080;
const server = app.listen(process.env.PORT || port, listening);

function listening(){
    console.log('Server Running');
    console.log(`Running on localhost: ${port}`);
}

module.exports = server;