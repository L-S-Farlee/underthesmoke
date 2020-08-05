/*
Levi Farlee
SDEV 250

This code is used to show the user what kind of information a website can
find out about their machine and browser. It uses navigator & screen objects to obtain information.

*/

//global variables
var finalText = "<b>Your browser info:</b> <br />"+navigator.userAgent+"<br />"
	+"<b>Your OS: </b><br />"+ navigator.platform +"<br />"
	+"<br />And just for fun (these wouldn't do much damage): <br /><b>Your screen's width:</b> "+ screen.width +"<br />"
	+"<b>Your screen's height: </b>"+ screen.height +"<br />"
	+"<b>Your screen's pixel depth: </b>"+ screen.pixelDepth +"<br />";
	
//function to cover setup
function setUp() {
	document.getElementById("webSecurityInfo").innerHTML = finalText;
}
	
//load script on page load
if (window.addEventListener) {
  window.addEventListener("load", setUp, false);
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUp);
}
