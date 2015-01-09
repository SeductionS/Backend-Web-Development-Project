/**
 * Created by Roderik on 8/01/2015.
 */
jQuery(function($){
    var socket = io.connect();
    var $hashtagform = $('#send-hashtag');
    var $hashtag = $('#hashtag');

    $hashtagform.submit(function(e){
        e.preventDefault();
        console.log("hashtag sent");
        socket.emit('hashtag-read', $hashtag.val());
        $hashtag.val('');
    })

    socket.on('hashtagstracking', function(hashtags){
       console.log(hashtags);
       var l = hashtags.length;


        if(l>3){
            console.log("limit exceeded");

            var latesttags = hashtags.slice(Math.max(l - 3, 1));
            console.log(latesttags);

            $("#nav-mobile").empty();
            var length = latesttags.length;
            for(i = 0; i<length; i++){
                $("#nav-mobile").append('<li><a href="'+hashtags[i].slice(1)+'">'+hashtags[i]+'</a></li>');
            }
        }
        else{
                $("#nav-mobile").append('<li><a href="'+hashtags[l-1].slice(1)+'">'+hashtags[l-1]+'</a></li>');
        }
    });
});