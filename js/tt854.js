initAPIListeners();

function chatcallback(data) {

    if (data.message == '.christmas1') {
        $('body').css('background-image', 'url(http://i.imgur.com/2Q89Rn2.png)');
        $('#playback .background').hide();
        $('#playback-container').css('border', '2px solid #4D4D4D');

    } else if (data.message == '.christmas2') {

        $('body').css('background-image', 'url(http://i.imgur.com/P4GVhF4.png)');
        $('#playback .background').hide();
        $('#playback-container').css('border', '2px solid #4D4D4D');

    } else if (data.message == '.christmas3') {

        $('body').css('background-image', 'url(http://i.imgur.com/M0CeHah.png)');
        $('#playback .background').hide();
        $('#playback-container').css('border', '2px solid #4D4D4D');
    }

}

function initAPIListeners() {
    API.on(API.CHAT, chatcallback);
}