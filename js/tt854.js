initAPIListeners();
var wooting = false;
API.chatLog('tt854 bookmarklet loaded. hi hi. look how red this message is.',true);

function chatcallback(data) {

     var matches = data.message.match(/^(?:pears)\s+(.*)/);
     if (matches) {
        var cmmnd = matches[1];
        Commander(data, cmmnd); 
     } else {
        Commander(data, data.message);
     }

}
function Commander(data, cmmnd) {
    var person = data.fromID;
    var role = API.ROLE.BOUNCER;
    var check = API.hasPermission(person,role);
if (check){
    if (cmmnd == '.christmas1') {
       changebg('http://i.imgur.com/2Q89Rn2.png');
    } else if (cmmnd == '.christmas2') {
       changebg('http://i.imgur.com/P4GVhF4.png')

    } else if (cmmnd == '.christmas3') {
        changebg('http://i.imgur.com/M0CeHah.png');

    } else if (cmmnd == '.christmas3') {
        changebg('http://i.imgur.com/M0CeHah.png');

    } else if (cmmnd == '.redwall'){
      changebg('http://i.imgur.com/u36VR4n.png');

    } else if (cmmnd == '.riptt'){
      changebg('http://i.imgur.com/GZKgCpk.png');

    } else if (cmmnd == '.space'){
      changebg('http://i.imgur.com/xTQJCDf.jpg');

    } else if (cmmnd == '.hide screen') {
            $('#playback').css('opacity', 0);

    } else if (cmmnd == '.show screen') {
             $('#playback').css('opacity', 100);
    }
  }
  }

function commandcallback(value) {
  if (value == '/autowoot'){
      wooting = true;
      API.chatLog('Autowooting has been activated, dawg.',false);
      wootSong();
  } else if (value == '/kill autowoot') {
      wooting = false;
      API.chatLog('Autowoot off. Ok? Ok.',false);
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
  $('body').css('background-image', 'url('+url+')');
   
}

function initAPIListeners() {
    API.on(API.CHAT, chatcallback);
    API.on(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
    API.on(API.CHAT_COMMAND, commandcallback);

}

