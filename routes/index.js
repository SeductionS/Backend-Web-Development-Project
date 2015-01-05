var express = require('express');
var router = express.Router();
//var Tweet = require('../data/models/tweet');
var mongoose = require('mongoose');
var Tweet = mongoose.model("Tweet");

/* GET home page. */
router.get('/', function(req, res) {
//    var data = JSON.stringify(Tweet.find({}));
//    console.log(data);

    Tweet.find({}).sort('-_id').limit(20).lean().exec(
        function(err,tweets){

            res.render('index', { title: 'Twitterwall App',
                "data": tweets
            })

        })


});

module.exports = router;
