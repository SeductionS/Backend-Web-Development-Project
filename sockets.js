/**
 * Created by Roderik on 8/01/2015.
 */
//socket.IO functionality
var sockets = function(server){
    var hashtags = {},
    io = require('socket.io').listen(server),
    Twitter = require('node-tweet-stream'),
    Tweet = require('./data/models/tweet'),
    hashtags = [],
    hashtag,
        nicknames=[];



    io.sockets.on('connection', function(socket){
        //socket.sockethts = [];
        socket.trackinghtag = null;

        // TWITTER SEARCH

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
                    htag = socket.trackinghtag;

                if(bUrl == "" || bUrl== null || bUrl == "undefined")
                {
                    //console.log("empty tweet");
                }
                else{
                    var newTweet = new Tweet({userName: uName, imageUrl: iUrl, bannerUrl: bUrl, text: txt, hashTag: htag});

                    newTweet.save(function(err, createdTweet){
                        if(err){ console.log(err); }
                        else{ socket.emit('new-tweet');  }
                    });
                }

                t.on('error', function(err){
                    console.log('oh no: ', err)
                });

            });

            socket.on("hashtag-read", function(htag){
                //start tracking new hashtag
                hashtag = htag.trim();
                console.log(hashtag);
                if(hashtag.substr(0,1) !== '#'){
                    //console.log("hashtag doesn't start with #");
                    hashtag = '#'+hashtag;
                }
                socket.trackinghtag = hashtag;
                t.track(socket.trackinghtag);

                //push hashtag into hashtagarray, will be used to show tracking hashtags in menu
                hashtags.push(hashtag);
                io.sockets.emit('hashtagstracking',hashtags);
                //set hashtag as socketproperty, will be used to stop tracking the hashtag when client/socket disconnects --> reduce unnecessary server load
                //socket.sockethts.push(hashtag);
                socket.trackinghtag = hashtag;
                console.log(socket.sockethts);

                //console log of the newly added hashtag which is tracking
                console.log("socket is now tracking: "+hashtag);
            });

            socket.on("disconnect", function(){

                console.log("Socket disconnected, following hashtag will stop tracking:"+socket.trackinghtag);
    //            var l = socket.sockethts.length;
    //            for(i=0;i<l;i++){
    //                var index = hashtags.indexOf(socket.sockethts[i]);
    //                t.untrack(socket.sockethts[i]);
    //                if(index>-1) {hashtags.splice(index,1);}
    //            }
                t.untrack(socket.trackinghtag);
                if(!socket.nickname) return;
                nicknames.splice(nicknames.indexOf(socket.nickname), 1);
                updateNicknames();
            });
        function updateNicknames(){
            io.sockets.emit('usernames', nicknames);
        }

        // CHATBOX
        socket.on('send-chat-message', function(data){
            io.sockets.emit('new-chat-message', {msg: data, nick: socket.nickname});
        });

        socket.on('new user', function(data,callback){
            if(nicknames.indexOf(data) != -1){
                callback(false);
            }
            else{
                callback(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);
                updateNicknames();
            }
        });

    });


};

module.exports = sockets;