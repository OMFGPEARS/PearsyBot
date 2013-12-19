initAPIListeners();
var wooting = false;
API.chatLog('tt854 bookmarklet loaded. hi hi. look how red this message is.',true);
var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
jQuery('#chat-input-field').autocomplete({source: availableTags });
jQuery('body').append("<style>.ui-helper-hidden-accessible{display:none;}.autocomplete-suggestions { border: 1px solid #999; background: #fff; cursor: default; overflow: auto; }.autocomplete-suggestion { padding: 10px 5px; font-size: 1.2em; white-space: nowrap; overflow: hidden; } .autocomplete-selected { background: #f0f0f0; } .autocomplete-suggestions strong { font-weight: normal; color: #3399ff;}</style>");

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
  $('#playback-container').css('background-image', 'url(http://i.imgur.com/wBs0unz.gif)');
  $('body').css('background-image', 'url('+url+')');
   
}

function initAPIListeners() {
    API.on(API.CHAT, chatcallback);
    API.on(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
    API.on(API.CHAT_COMMAND, commandcallback);

}

