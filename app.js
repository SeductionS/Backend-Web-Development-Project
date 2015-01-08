var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    Twitter = require('node-tweet-stream'),
    dbconnect = require("./data/connectDB.js"),
    Tweet = require('./data/models/tweet');


var t = new Twitter({
    consumer_key: 'hMllGcLbZRdSaNWGMrwqva59F',
    consumer_secret: 'hzqHljQrwMKr9gbXHLRyMZM3R7gCvn46APmtsVqjOwu9vNTIRj',
    token: '117846824-hY2PPzisqkw1kDfc19hlkYM8c3WXAPyiQcoB5PK9',
    token_secret:'9MGDUGxJiUWtPqFCYtnmkled39wFS4pe8ISaAbz3ypIZk'
});


t.on('tweet', function(twdata){
//    console.log(twdata.user.profile_image_url);
//    console.log(twdata.user.screen_name);
//    console.log(twdata.user.profile_banner_url);
//    console.log(twdata.text);
//    console.log("");
    var uName = twdata.user.screen_name.toString();
    var iUrl = twdata.user.profile_image_url;
    var bUrl = twdata.user.profile_banner_url;
    var txt = twdata.text;
    var htag = "test";

//    console.log("username: " + uName + " - " + typeof uName);
//    console.log("image url: " + iUrl + " - " + typeof iUrl);
//    console.log("banner url: " + bUrl + " - " + typeof bUrl);
//    console.log("text: " + txt + " - " + typeof txt);
//    console.log("hashtag: " + htag + " - " + typeof htag);



    var newTweet = new Tweet({
        userName: uName,
        imageUrl: iUrl,
        bannerUrl: bUrl,
        text: txt,
        hashTag: htag
    });

    newTweet.save(function(err, createdTweet){
        if(err){
            console.log(err);
        }
        else{
            //console.dir(createdTweet);
        }

    });

});

t.on('error', function(err){
    console.log('oh no: ', err)
});

//t.track('Belgium');

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
