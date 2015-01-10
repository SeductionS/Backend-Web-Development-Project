/**
 * Created by Roderik on 10/01/2015.
 */
jQuery(function($){
    var socket = io.connect();
    var $messageForm = $("#send-message");
    var $nickForm = $("#setNick");
    var $nickBox = $('#nickname');
    var $messageBox = $("#message");
    var $chat = $('#chat');
    var $users = $('#users');
    var $chatbutton = $('#chatbutton');
    var $chatboxwrap = $('#chatboxwrap');
    var toggleChat = false;
    var $sendhashtag = $('#send-hashtag');
    var $twitterwall = $('.wall');

    $chatbutton.click(function(e){
        e.preventDefault();
        toggleChat = !toggleChat;
        if(toggleChat){
            $chatboxwrap.show();
            $sendhashtag.hide();
            $twitterwall.hide();
        }
        else{
            $chatboxwrap.hide();
            $sendhashtag.show();
            $twitterwall.show();
        }
    });

    $nickForm.submit(function(e){
        e.preventDefault();

        socket.emit('new user', $nickBox.val(), function(data){
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }
            else{
                toast("<span>Deze gebruikersnaam is al in gebruik, probeer opnieuw met een andere naam.</span>", 5000);
            }
        });
        $nickBox.val('');
    });

    $messageForm.submit(function(e){
        e.preventDefault();
        socket.emit('send-chat-message', $messageBox.val());
        $messageBox.val('');
    });

    socket.on('new-chat-message', function(data){
        $chat.append('<b>'+data.nick+': </b>'+ data.msg + "<br/>");
    });

    socket.on('usernames', function(data){
        var html = '';
        var l = data.length;
        for(i=0; i< l; i++){
            html += data[i];
            html +='<br/>';
        }
        $users.html(html);
    });
});