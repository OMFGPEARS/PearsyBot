var TT854 = {
    wooting : false,
    screenmoving : false,
    commands : {},
    role : API.ROLE.BOUNCER,
    pears_prefix : '/^(?:pears)\s+(\w+)\s*(.*)/',
    
    init: function(){
        API.chatLog('tt854 bookmarklet loaded. hello.', false);
        this.changebg('http://i.imgur.com/u36VR4n.png');
        this.commands = TT854.getCommands();
    },

    roleCheck : function(person, role){
        if (API.hasPermission(person,role)){
            return true;
        }else{return false;}
    },
    
    chatcallback : function(data) {
        var person_id = data.fromID;
        var check = TT854.roleCheck(person_id, API.ROLE.BOUNCER);
        var chat_command = data.message.match(/(\w+)\s*(.*)/);
        // console.log(chat_command);
        // console.log(data);
        var chat_data = {
            cmmnd: chat_command[1],
            args: chat_command[2]
        }
        var args = chat_data[2];
        
        if (check) {
            TT854.changebg(TT854.commands[chat_data.args]);
        }
    },
    
    commandcallback : function(value) {
        if (value == '/autowoot') {
            this.wooting = true;
            API.chatLog('Autowooting has been activated, dawg.', false);
            this.wootSong();
        } else if (value == '/kill autowoot') {
            this.wooting = false;
            API.chatLog('Autowoot off. Ok? Ok.', false);
        }
    },

    DJ_ADVANCE_LISTENER : function(obj) {
        TT854.wootSong();
    },

    wootSong : function() {
        $("#woot").click();
        console.log('wooted');
    },
    
    getCommands : function (){
        var commands = {};
        $.ajax({
            dataType: "jsonp",
            url: "//spreadsheets.google.com/feeds/list/0AgUer4XUnq3jdEJhbkZSaFcwVnM1NzdqSFlxaEZPcUE/od6/public/values?alt=json-in-script", 
            success:  function (data){
                for (var command in data.feed.entry){
                    commands[data.feed.entry[command].gsx$command.$t] = data.feed.entry[command].gsx$link.$t;
                }
            }
        });
        return commands;
    },
    
    changebg : function(url) {
        $('#playback .background').hide();
        $('#playback-container').css('border', '2px solid #4D4D4D');
        $('#playback-container').css('background-image', 'url(http://i.imgur.com/wBs0unz.gif)');
        $('body').css('background-image', 'url(' + url + ')');
    }
}
TT854.init();

function initAPIListeners() {
    API.on(API.CHAT, TT854.chatcallback);
    API.on(API.CHAT_COMMAND, TT854.commandcallback);
    API.on(API.DJ_ADVANCE, TT854.DJ_ADVANCE_LISTENER);
}

initAPIListeners();