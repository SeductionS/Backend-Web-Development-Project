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
});