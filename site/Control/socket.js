var socket = io.connect();
var lastEmit = new Date().getTime();
var dotIndex = null;
var dotNormalChar = null;
var skills = null;
var dots = window.setInterval( function() {
	if (dotIndex != null && dotNormalChar != null) {
	    var text = $( "#map div" ).eq( dotIndex ).text();
	    if (text == dotNormalChar) {
	    	$( "#map div" ).eq( dotIndex ).text("*");
	    }else{
	    	$( "#map div" ).eq( dotIndex ).text(dotNormalChar);
	    }
	};
    }, 1000);

socket.on('mapPoss', function(data) {
	if ($( "#map div" ).eq( dotIndex ).text() == "*") {
		$( "#map div" ).eq( dotIndex ).text(dotNormalChar);
	};
	dotNormalChar = $( "#map div" ).eq( data ).text();
	dotIndex = data;
});
socket.on('skills', function(data) {
	console.log(data);
	skills = data;
	$("#ajaxStr").text(data.ajaxStr);
	$("#ajaxDex").text(data.ajaxDex);
	$("#ajaxHealth").text(data.ajaxHealth);
	$("#ajaxEng").text(data.ajaxEng);
	$("#ajaxGold").text(formatNumber(data.ajaxGold));
	$("#ajaxQP").text(data.ajaxQP);
	$("#ajaxLvl").text(data.ajaxLvl);
	$("#ajaxExpL").text(data.ajaxExpL);
});

$(document).ready(function() {
	"use strict";
	var terminal = $(".terminal");
	var prompt = ">>"; //➜
	var path = "~";

	var command = "";
	var commandHistory = [];
	var historyIndex = 0;

	function displayPrompt() {
		terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
		terminal.append("<span class=\"path\">" + path + "</span> ");
		var height = parseInt(terminal.height());
		terminal.animate({scrollTop: height});
	}

	// Delete n number of characters from the end of our output
	function erase(n) {
		command = command.slice(0, -n);
		terminal.html(terminal.html().slice(0, -n));
	}

	function clearCommand() {
		if (command.length > 0) {
			erase(command.length);
		}
	}

	function appendCommand(str) {
		terminal.append(str);
		command += str;
	}

	$(document).keydown(function(e) {
		e = e || window.event;
		var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

		// BACKSPACE
		if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
			e.preventDefault();
			if (command !== "") {
				erase(1);
			}
		}

		// UP or DOWN
		if (keyCode === 38 || keyCode === 40) {
			// Move up or down the history
			if (keyCode === 38) {
				// UP
				historyIndex--;
				if (historyIndex < 0) {
					historyIndex++;
				}
			} else if (keyCode === 40) {
				// DOWN
				historyIndex++;
				if (historyIndex > commandHistory.length - 1) {
					historyIndex--;
				}
			}

			// Get command
			var cmd = commandHistory[historyIndex];
			if (cmd !== undefined) {
				clearCommand();
				appendCommand(cmd);
			}
		}
	});

	$(document).keypress(function(e) {
		// Make sure we get the right event
		e = e || window.event;
		var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

		// Which key was pressed?
		switch (keyCode) {
			// ENTER
			case 13:
				{
					terminal.append("\n");
					doEmit();
					
					break;
				}
			default:
				{
					appendCommand(String.fromCharCode(keyCode));
				}
		}
	});

	terminal.append("Welcomen to mukuduk\n");
	displayPrompt();
	function doEmit(){
		if (lastEmit + 3000 < new Date().getTime()) {
			socket.emit('command', command, function (respons){
				terminal.append(decode(respons)+"\n");
				commandHistory.push(command);
				historyIndex = commandHistory.length;
				command = "";

				displayPrompt();
				lastEmit = new Date().getTime();
			});
		}else{
			terminal.append("you have to whait : " + (((lastEmit - new Date().getTime()+ 3000) / 1000)) + " sec\n");
			commandHistory.push(command);
			historyIndex = commandHistory.length;
			command = "";

			displayPrompt();
		}
		
	}
});