/**
 * Created by Roderik on 8/01/2015.
 */
//socket.IO functionality
var sockets = function(server){
    var hashtags = {},
    io = require('socket.io').listen(server),
    Twitter = require('node-tweet-stream'),
    Tweet = require('./data/models/tweet'),
    hashtags = [];

    var t = new Twitter({
        consumer_key: 'hMllGcLbZRdSaNWGMrwqva59F',
        consumer_secret: 'hzqHljQrwMKr9gbXHLRyMZM3R7gCvn46APmtsVqjOwu9vNTIRj',
        token: '117846824-hY2PPzisqkw1kDfc19hlkYM8c3WXAPyiQcoB5PK9',
        token_secret:'9MGDUGxJiUWtPqFCYtnmkled39wFS4pe8ISaAbz3ypIZk'
    });

    t.on('tweet', function(twdata){
        var uName = twdata.user.screen_name.toString(),
        iUrl = twdata.user.profile_image_url,
        bUrl = twdata.user.profile_banner_url,
        txt = twdata.text,
        htag = "test";

        var newTweet = new Tweet({userName: uName, imageUrl: iUrl, bannerUrl: bUrl, text: txt, hashTag: htag});

        newTweet.save(function(err, createdTweet){
            if(err){ console.log(err); }
            else{ console.log("new tweet added"); }
        });

        t.on('error', function(err){
            console.log('oh no: ', err)
        });

    });

    io.sockets.on('connection', function(socket){
        socket.sockethts = [];

        socket.on("hashtag-read", function(hashtag){
            //start tracking new hashtag
            t.track(hashtag);

            //push hashtag into hashtagarray, will be used to show tracking hashtags in menu
            hashtags.push(hashtag);
            io.sockets.emit('hashtagstracking',hashtags);
            //set hashtag as socketproperty, will be used to stop tracking the hashtag when client/socket disconnects --> reduce unnecessary server load
            socket.sockethts.push(hashtag);
            console.log(socket.sockethts);

            //console log of the newly added hashtag which is tracking
            console.log("socket is now tracking: #"+hashtag);
        })

        socket.on("disconnect", function(){
            var l = socket.sockethts.length;
            for(i=0;i<l;i++){
                var index = hashtags.indexOf(socket.sockethts[i]);
                if(index>-1) {hashtags.splice(index,1);}
            }
        })

    });


};

module.exports = sockets;