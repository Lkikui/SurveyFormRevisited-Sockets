/*---------- modules ----------*/
//express
var express = require( "express");
var app = express();

//path
var path = require( "path");

//static 
app.use(express.static(path.join(__dirname, "./static")));

//views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

/*---------- route ----------*/
//renders index page
app.get('/', function(request, response) {
    response.render("index");
});

/*---------- port ----------*/
var server = app.listen(8000, function() {
    console.log("SurveyFormRevisited Project listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);

    socket.on("posting_form", function (data){
        console.log(`Someone clicked a button!`);
        console.log(data);
        //EMIT
        socket.emit('updated_message', data);
    });

    socket.on("random_number", function (number) {
        console.log(`number: ${number}`);
        socket.emit('random_number', number);
    })
});

