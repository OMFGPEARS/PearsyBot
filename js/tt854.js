initAPIListeners();
var wooting = false;


function chatcallback(data) {
    var person = data.fromID;
    var role = API.ROLE.BOUNCER;
    var check = API.hasPermission(person,role);
    if (check){
    if (data.message == '.christmas1') {
       changebg('http://i.imgur.com/2Q89Rn2.png');
    } else if (data.message == '.christmas2') {
       changebg('http://i.imgur.com/P4GVhF4.png')

    } else if (data.message == '.christmas3') {
        changebg('http://i.imgur.com/M0CeHah.png');

    } else if (data.message == '.christmas3') {
        changebg('http://i.imgur.com/M0CeHah.png');

    } else if (data.message == '.hide screen') {
            $('#playback').css('opacity', 0);

    } else if (data.message == '.show screen') {
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
  $('body').css('background-image', 'url('+url+')');
   
}

function initAPIListeners() {
    API.on(API.CHAT, chatcallback);
    API.on(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
    API.on(API.CHAT_COMMAND, commandcallback);

}