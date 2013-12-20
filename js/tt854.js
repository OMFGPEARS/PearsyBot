/*
    TT854 Copyright (C)2013 Brian J. Hong, Matthew Thompson

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var TT854 = {
    version: 0.9,
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
    
    screenAnimate: function(params){
        //no options yet
        var options = {
            'up' : 'show',
            'down' : 'hide'
        }
        
        if (params == ['up']){
            var height = 0; var opacity = 0;
        }else{ var height = '281px'; var opacity = 100;}
        
        $('#playback').animate({
            'height': height,
            'opacity' : opacity
        }, 4000);
        
    },
    
    chatcallback : function(data) {
        var person_id = data.fromID;
        var check = TT854.roleCheck(person_id, API.ROLE.BOUNCER);
        var chat_command = data.message.match(/(\w+)\s*(.*)/);
        var chat_data = {
            cmmnd: chat_command[1],
            args: chat_command[2]
        }
        
        if (check) {
            switch(chat_data.cmmnd){
                case 'screen':
                    TT854.screenAnimate(chat_data.args);
                break;
                case 'bg':
                    TT854.changebg(TT854.commands[chat_data.args]);
                break;
                default:
                //don't do anything
            }
        }
    },
    
    commandcallback : function(value) {
        if (value == '/autowoot') {
            this.wooting = true;
            API.chatLog('Autowooting has been activated, dawg.', false);
            TT854.wootSong();
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
        $('#playback-container').css({
            'border': '2px solid #4D4D4D',
            'background-image': 'url(http://i.imgur.com/wBs0unz.gif)'
        });
        if (url != "undefined"){
            $('body').css('background-image', 'url(' + url + ')');
        }
    }
}

TT854.init();

function initAPIListeners() {
    API.on(API.CHAT, TT854.chatcallback);
    API.on(API.CHAT_COMMAND, TT854.commandcallback);
    API.on(API.DJ_ADVANCE, TT854.DJ_ADVANCE_LISTENER);
    API.on(API.FAN_JOIN, function(data){console.log(data)});
    API.on(API.FRIEND_JOIN, function(data){console.log(data)});
}

initAPIListeners();
