// LETS SHOP FOR SHIT

exports.names = ['pears shop', '.shop', 'shop'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
	var item = ['a five-pound human fat replica', 'a ROSWELL SOIL SAMPLE', 'DOLLY THE SEXY INFLATABLE SHEEP', 'a magical unicorn mask', 'UNICORN MEAT', 'ENGLISH AS A SECOND F*CKING LANGUAGE, by Sterling Johnson', 'some LIVE LADY BUGS', 'a shower gel dispenser shaped like a nose', 'A FREAKING COOL STEGOSAURUS COSTUME FOR A DOG', 'a bottle of wolf urine', 'A NEAT KITCHEN ART HAM DOGGER', 'an underpants dispenser', 'a rainbow glow in the dark full body unitard', 'URANIUM ORE', 'a political advertisement making software for my PC', 'a pretty dang rare penny', 'RABBIT BROTH', 'a green remote for a laserdisc player', 'EDIBLE CANDLE WAX', 'some dude\'s XBox live account', 'a Club Penguin membership', 'a meat slicer with a detachable blade', 'A GATE FROM AN OLD CAGE AT A ZOO IN OHIO', 'a radish themed water bottle for a hamster', 'a tube of contained headlice'];
	var price = Math.ceil(Math.random() * 500);

	var price2 = Math.floor(Math.random() * 99);
	var crns = ['£ ', '$ ', '€ ', 'CAD$ ', '¥ '];
	var currency = crns[Math.floor(Math.random() * (crns.length))];

	var response = 'Guys I just bought ' + item[Math.floor(Math.random() * (item.length))] + ' for ' + currency + price + '.' + price2;
    bot.chat(response);
};
