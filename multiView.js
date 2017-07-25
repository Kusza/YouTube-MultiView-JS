
//Update with your video links | First Item is sound master | Supports up to 9 Views
var VideoLinks = ["weYoL2FiHBM", "Mf3TPfk9jZU"];
var VideoHeight = 480; //px
var VideoWidth = 720; //px
var VideoStyle = 1;



//HTML to replace player-multi
var idReplaceText = '<div id="multiViewPlayers"><div id="blockemandsockem"></div>';
for (i = 1; i < VideoLinks.length+1; i++) { 
	idReplaceText += '<div id="player' + i + '"></div>';
}
idReplaceText += '</div><div id="multiViewButtons"><button id="PlayPause" onclick="playPauseEvent();">Play</button><button id="Swichero" onclick="viewerSwitchViews();" disabled>View 1</button><button id="SwicheroStyle" onclick="Stlyero()" disabled>Style 1</button><button id="Rewind" ontouchstart="timercount()" onmousedown="timercount()" ontouchend="TimeTravel(&quot;rewind&quot;)" onmouseup="TimeTravel(&quot;rewind&quot;)" disabled>Rewind</button><button id="Skipperdo" ontouchstart="timercount()" onmousedown="timercount()" ontouchend="TimeTravel(&quot;tothefuture&quot;)" onmouseup="TimeTravel(&quot;tothefuture&quot;)" disabled>Fast Forward</button></div>'
$("#player-multi").replaceWith(idReplaceText);
document.getElementById("multiViewButtons").style.marginTop = ((VideoHeight - 16).toString() + "px");
document.getElementById("blockemandsockem").style.height = (VideoHeight.toString() + "px");
document.getElementById("blockemandsockem").style.width = (VideoWidth.toString() + "px");
var timecontroller = 0;
var videolengthmultiplyer = 0;
var timerInterval;

//YouTube API caller
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Creates Video Instances
var player = [];
function onYouTubeIframeAPIReady() {

	player[0] = new YT.Player('player' + (1), {
		height: (VideoHeight.toString() + "px"),
		width: (VideoWidth.toString() + "px"),
		videoId: VideoLinks[0],
		playerVars: { 
			'autoplay': 0,
			'controls': 0,
			'disablekb': 1,
			'fs': 0,
			'iv_load_policy': 3,
			'modestbranding': 1,
			'showinfo': 0,
			'rel' : 0
		},
		events: {
		}
	})
	for (i = 1; i < VideoLinks.length; i++) { 
		player[i] = new YT.Player('player' + (i+1), {
			height: (VideoHeight.toString() + "px"),
			width: (VideoWidth.toString() + "px"),
			videoId: VideoLinks[i],
			playerVars: { 
				'autoplay': 0,
				'controls': 0,
				'disablekb': 1,
				'fs': 0,
				'iv_load_policy': 3,
				'modestbranding': 1,
				'showinfo': 0,
				'rel' : 0
			},
			events: {
				'onReady': onPlayerReady
			}
		})
	}

}

//Sets Mute and ZIndex on Start
function onPlayerReady() {

	document.getElementById("player1").style.zIndex = "10"; //Main Video Sync Identfier
	for (i = 1; i < VideoLinks.length; i++) {
		player[i].mute(); //Keeps first file as master volume
		document.getElementById("player"+(i+1)).style.zIndex = i;
	}

}

//Pretty self explanatory
function playPauseEvent() {

	if ($("#PlayPause").text() == "Play") {
		for (i = 0; i < VideoLinks.length; i++) { 
			player[i].playVideo();
			document.getElementById("Swichero").disabled = false;
			document.getElementById("SwicheroStyle").disabled = false;
			document.getElementById("Rewind").disabled = false;
			document.getElementById("Skipperdo").disabled = false;
		}
		$("#PlayPause").text("Pause");
	} else {
		for (i = 0; i < VideoLinks.length; i++) { 
			player[i].pauseVideo();
		}
		$("#PlayPause").text("Play"); 
	}
	
	checkSync();

}

//Switch View Button
function viewerSwitchViews() {
	
	for (i = 0; i < VideoLinks.length; i++) { 
		document.getElementById("player"+(i+1)).style.zIndex -= 1;
	}
	for (i = 0; i < VideoLinks.length; i++) { 
		if (document.getElementById("player"+(i+1)).style.zIndex == 9) {
			document.getElementById("player"+(i+1)).style.zIndex = (VideoLinks.length-1);
		}
		if (document.getElementById("player"+(i+1)).style.zIndex == 0) {
			document.getElementById("player"+(i+1)).style.zIndex = 10;
			$("#Swichero").text("View " + (i+1)); 
		}
	}
		
	if (VideoStyle == 2) { //Style 2 (Two Side by Side Video)
		for (i = 0; i < VideoLinks.length; i++) { 
			if (document.getElementById("player" + (i+1)).style.zIndex == (VideoLinks.length - 1)) {
				document.getElementById("player" + (i+1)).style.marginLeft = ((VideoWidth/2).toString()+"px");
			}
			if (document.getElementById("player" + (i+1)).style.zIndex == (10)) {
				document.getElementById("player" + (i+1)).style.marginLeft = "0px";
			} 
		}
	}
	if (VideoStyle == 3) { //Style 3 (Picture in Picture)
		for (i = 0; i < VideoLinks.length; i++) { 
			if (document.getElementById("player" + (i+1)).style.zIndex != (10)) {
				document.getElementById("player" + (i+1)).style.marginLeft = "0px";
				document.getElementById("player" + (i+1)).style.marginTop = "0px";
				document.getElementById("player" + (i+1)).style.height = (VideoHeight.toString()+"px");
				document.getElementById("player" + (i+1)).style.width = (VideoWidth.toString()+"px");
			}
			if (document.getElementById("player" + (i+1)).style.zIndex == (10)) {
				document.getElementById("player" + (i+1)).style.marginLeft = ((VideoWidth - VideoWidth/3).toString()+"px");
				document.getElementById("player" + (i+1)).style.marginTop = ((VideoHeight/7).toString()+"px");
				document.getElementById("player" + (i+1)).style.height = ((VideoHeight/3.5).toString()+"px");
				document.getElementById("player" + (i+1)).style.width = ((VideoWidth/3.5).toString()+"px");
			} 
		}
	}
	
	checkSync();
	changeQuality();

}

//Reduces Quality for hidden video and upgraded
function changeQuality() {
	
	if (VideoStyle == 1) { //Style 1 (One Video Showing)
		for (i = 0; i < VideoLinks.length; i++) { 
			if (document.getElementById("player"+(i+1)).style.zIndex == 10) {
				player[i].setPlaybackQuality("default");
			} else {
				player[i].setPlaybackQuality("small");
			}
		}
	}
	if (VideoStyle == 2 || VideoStyle == 3) { //Style 2 (Two Side by Side Video)
		for (i = 0; i < VideoLinks.length; i++) { 
			if (document.getElementById("player" + (i+1)).style.zIndex >= (VideoLinks.length - 1)) {
				player[i].setPlaybackQuality("default");
			} else {
				player[i].setPlaybackQuality("small");
			}
		}
	}

}

//Future Update for feature in feature and side by side options
function Stlyero() {

	switch(VideoStyle) {
		case 1:
			for (i = 0; i < VideoLinks.length; i++) { 
				document.getElementById("player" + (i+1)).style.width = ((VideoWidth/2).toString()+"px");
				if (document.getElementById("player" + (i+1)).style.zIndex == (VideoLinks.length - 1)) {
					document.getElementById("player" + (i+1)).style.marginLeft = ((VideoWidth/2).toString()+"px");
				}
			}
			VideoStyle = 2;
			$("#SwicheroStyle").text("Style " + "2"); 
			break;			
		case 2:
			for (i = 0; i < VideoLinks.length; i++) { 
				if (document.getElementById("player" + (i+1)).style.zIndex == (10)) {
					document.getElementById("player" + (i+1)).style.marginLeft = ((VideoWidth - VideoWidth/3).toString()+"px");
					document.getElementById("player" + (i+1)).style.marginTop = ((VideoHeight/7).toString()+"px");
					document.getElementById("player" + (i+1)).style.height = ((VideoHeight/3.5).toString()+"px");
					document.getElementById("player" + (i+1)).style.width = ((VideoWidth/3.5).toString()+"px");
				} else {
					document.getElementById("player" + (i+1)).style.marginLeft = "0px";
					document.getElementById("player" + (i+1)).style.marginTop = "0px";
					document.getElementById("player" + (i+1)).style.height = (VideoHeight.toString()+"px");
					document.getElementById("player" + (i+1)).style.width = (VideoWidth.toString()+"px");
				}
			}
			VideoStyle = 3;
			$("#SwicheroStyle").text("Style " + "3"); 
			break;
		case 3:
			for (i = 0; i < VideoLinks.length; i++) { 
				document.getElementById("player" + (i+1)).style.height = (VideoHeight.toString()+"px");
				document.getElementById("player" + (i+1)).style.width = (VideoWidth.toString()+"px");
				document.getElementById("player" + (i+1)).style.marginLeft = "0px";
				document.getElementById("player" + (i+1)).style.marginTop = "0px";
			}
			VideoStyle = 1;
			$("#SwicheroStyle").text("Style " + "1"); 
			break;	
	}
	
	checkSync();
	changeQuality();

}

//Used to count how long a button is help and adjust based on video length
function timercount() {

	for (i = 0; i < VideoLinks.length; i++) { 
		if (document.getElementById("player"+(i+1)).style.zIndex == 10) {
			videolengthmultiplyer = player[i].getDuration() / 90; //Change number lower for bigger skipping overall
		}
	}

	timerInterval = setInterval(function(){
		timecontroller += 1; //Increase for fast click bigger skipping
		}, 100); //Change number lower for bigger skipping on holds
	timecontroller += 2; //Increase for faster skipping on holds

}

//Let the video players travel through time
function TimeTravel(input) {
	
	var tempTime;
	for (i = 0; i < VideoLinks.length; i++) { 
		if (document.getElementById("player"+(i+1)).style.zIndex == 10) {
			if (input == "rewind") {
				tempTime = (player[i].getCurrentTime() - (timecontroller*videolengthmultiplyer));
			} else {
				tempTime = (player[i].getCurrentTime() + (timecontroller*videolengthmultiplyer));
			}
		}
	}
	clearInterval(timerInterval);
	timecontroller = 0;
	
	for (i = 0; i < VideoLinks.length; i++) { 
			player[i].seekTo(tempTime, true);
	}
}


//Double checks secondary and hidden cameras are in sync
function checkSync() {

	for (i = 0; i < VideoLinks.length; i++) { 
		if (document.getElementById("player"+(i+1)).style.zIndex == 10) {
			var tempTime = player[i].getCurrentTime();
		}
	}
	for (i = 0; i < VideoLinks.length; i++) { 
		if (document.getElementById("player"+(i+1)).style.zIndex != 10) {
			player[i].seekTo(tempTime, true);
		}
	}

}