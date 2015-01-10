/**
 * Created by Roderik on 8/01/2015.
 */
jQuery(function($){
    var socket = io.connect();
    var $hashtagform = $('#send-hashtag');
    var $hashtag = $('#hashtag');
    var newTweets = 0;
    var uri = window.location.pathname;
    var cards;
    var wall = $(".wall");

    $(document).ready(function() {
        cards = $('.card').length;
        if(cards==0){
            var preloader = '<div id="prldr"><div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div><span>Tweets aan het ophalen</span></div>';
            wall.append(preloader);
        }
    });


    $hashtagform.submit(function(e){
        e.preventDefault();
        //socket.emit('hashtag-read', $hashtag.val());
        var htag = $hashtag.val();
        console.log(htag);
        if(htag.substr(0,1) === '#'){
            htag = htag.slice(1);
            console.log('sliced # off: '+htag);
        }
        window.location = "../tweets/"+htag;
        $hashtag.val('');
    });

    socket.on('connect',function(){


        if(uri.substr(0,8)==="/tweets/"){
            uri = uri.slice(8);
            //console.log(uri);
            socket.emit('hashtag-read', uri);
        }
    });

    socket.on('new-tweet',function(){
        cards=1;
        $('#prldr').hide();
        newTweets++;
        $newtweets = $('.new');
        if(newTweets>0){
            var toasttext = '<span>'+newTweets+' Nieuwe tweets</span><a class="btn-flat yellow-text" href='+uri+'>Bekijk<a>';
            toast(toasttext, 5000);

        }
    });

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
                $("#nav-mobile").append('<li><a href="/tweets/'+hashtags[i].slice(1)+'">'+hashtags[i]+'</a></li>');
            }
        }
        else{
                $("#nav-mobile").append('<li><a href="/tweets/'+hashtags[l-1].slice(1)+'">'+hashtags[l-1]+'</a></li>');
        }
    });
});