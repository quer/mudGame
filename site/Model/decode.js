function decode (text) {
	var args = text.split("#");
	var returnText = ""
	for (var i = 0; i < args.length; i++) {
		if(args[i] != ""){
			var thisText = args[i];
			thisTextArgs = thisText.split(":");
			if (thisTextArgs.length > 1) {
				returnText += "<span class=\"" + thisTextArgs[0] + "\">" + thisTextArgs[1] + "</span>";
			}else{
				returnText += thisText;
			}
		}
	};
	return returnText;
}
function formatNumber(number)
{
    var number = number.toFixed(2) + '';
    var x = number.split('.');
    var x1 = x[0];
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1;
}