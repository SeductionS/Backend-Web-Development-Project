/**
 * Created by Roderik on 9/01/2015.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Tweet = mongoose.model("Tweet");

//GET all tweets with :hashtag
router.get('/tweets/:tag', function(req, res) {
    console.log("router reached");
    var htag = '#' + req.params.tag;

    console.log("routed tag is: "+htag);

    Tweet.find({hashTag: htag}).sort('-_id').limit(20).lean().exec(
        function(err,tweets){
            console.log(tweets);
            res.render('index', { title: 'Twitterwall App',
                "data": tweets
            })

        })


});

module.exports = router;