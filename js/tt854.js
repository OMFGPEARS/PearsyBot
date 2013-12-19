initAPIListeners();
var wooting = false;
var screenmoving = false;
API.chatLog('tt854 bookmarklet loaded. hello.', false);
changebg('http://i.imgur.com/u36VR4n.png');

function chatcallback(data) {

    var matches = data.message.match(/^(?:pears)\s+(\w+)\s*(.*)/);
    if (matches) {
        var infos = {
            cmmnd: matches[1],
            args: matches[2]
        };
        Commander(data, infos);
    } else {
        var ok = data.message.match(/(\w+)\s*(.*)/);
        var infos = {
            cmmnd: ok[1],
            args: ok[2]
        };
        Commander(data, infos);
    }

}

function Commander(data, infos) {
    var cmmnd = infos.cmmnd;
    var args = infos.args;
    var person = data.fromID;
    var role = API.ROLE.BOUNCER;
    if (cmmnd == 'bg') {
        var check = API.hasPermission(person, role);
        if (check) {

            if (args == 'christmas1') {
                changebg('http://i.imgur.com/2Q89Rn2.png');
            } else if (args == 'christmas2') {
                changebg('http://i.imgur.com/P4GVhF4.png')

            } else if (args == 'christmas3') {
                changebg('http://i.imgur.com/M0CeHah.png');

            } else if (args == 'christmas3') {
                changebg('http://i.imgur.com/M0CeHah.png');

            } else if (args == 'redwall') {
                changebg('http://i.imgur.com/u36VR4n.png');

            } else if (args == 'riptt') {
                changebg('http://i.imgur.com/GZKgCpk.png');

            } else if (args == 'space') {
                changebg('http://i.imgur.com/xTQJCDf.jpg');

            }
        }

    } else if (cmmnd == 'screen') {
        var check = API.hasPermission(person, role);
        if (check && !screenmoving) {
            if (args == 'hide' || args == 'up') {
                screenmoving = true;
                $('#playback').animate({
                    height: '0px'
                }, 4000);
                setTimeout(function () {
                    $('#playback').css('opacity', 0);
                    screenmoving = false;
                }, 4000);

            } else if (args == 'show' || args == 'down') {
                screenmoving = true;
                $('#playback').css('height', '0px');
                $('#playback').css('opacity', 100);
                $('#playback').animate({
                    height: '400px'
                }, 4000);
                setTimeout(function () {
                    screenmoving = false;
                }, 4000);
            }
        }
    }

}

function commandcallback(value) {
    if (value == '/autowoot') {
        wooting = true;
        API.chatLog('Autowooting has been activated, dawg.', false);
        wootSong();
    } else if (value == '/kill autowoot') {
        wooting = false;
        API.chatLog('Autowoot off. Ok? Ok.', false);
    }
}

function DJ_ADVANCE_LISTENER(obj) {
    wootSong();
}

function wootSong() {
    if (wooting) {
        $("#woot").click();
    }
}

function changebg(url) {
    $('#playback .background').hide();
    $('#playback-container').css('border', '2px solid #4D4D4D');
    $('#playback-container').css('background-image', 'url(http://i.imgur.com/wBs0unz.gif)');
    $('body').css('background-image', 'url(' + url + ')');

}

function initAPIListeners() {
    API.on(API.CHAT, chatcallback);
    API.on(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
    API.on(API.CHAT_COMMAND, commandcallback);

}