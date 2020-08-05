/*
	CaseProject
	Levi Farlee
	SDEV 250
	
	This script takes a date given by the user and compares to current day,
	and then explains the amount of time that's elapsed in years/months/days.
	The script uses Date() objects to accomplish this.
*/

//global variables
var d = new Date();
var todayY = d.getFullYear();
var todayM = d.getMonth();
var todayD = d.getDate();
var resultString = "";
var dateSelection;
//create Date() object with current date
var currentDate = new Date(todayY, todayM, todayD)


//function to get process dates and get amount of time elapsed
function timeElapsed() {
	//parse dateSelection and build Date() object out of that info
	try {
		//recognize date selection result
		dateSelection = document.getElementById("dateSelect").value;
		if (dateSelection === "") {
			throw "ERROR: Please choose a date.";
		}
		else {
			processDate();
		}
	} catch(msg) {
		alert(msg);
	}
}

//function to process given date information into a new Date() object
//and present
function processDate() {
	var dateArray = dateSelection.split("-");
	var correctMonth = parseInt(dateArray[1]);
	//create the Date() object for given date with fixed info
	var givenDate = new Date(dateArray[0], (correctMonth - 1), dateArray[2]);
	
	//process the dates to see their difference in terms of days
	var timeElapseDay = (((currentDate - givenDate) / 1000) / 86400);
	
	//variable for remainder of days after whole years (average year length computed)
	var yearsRemainder = (timeElapseDay % 365.2425);
	
	//final variables to present, number of days total
	var yearsDisplay = Math.floor(timeElapseDay / 365.2425);
	var monthsDisplay = Math.floor((timeElapseDay % 365.2425) / 30.44);
	var daysDisplay = Math.floor(yearsRemainder % 30.44);
	var exactDays = Math.round(timeElapseDay);
	var daysFormatted = exactDays.toLocaleString();
	
	//update the empty p element with result
	document.getElementById("timeResultPara").innerHTML = 
		"<br>Years: "+yearsDisplay+"<br><br>Months: "+
		monthsDisplay+"<br><br>Days: "+daysDisplay + "<br><br>Total Number of Days: "+daysFormatted;
}

//create event listeners
if (window.addEventListener) {
	document.getElementById("timeButton").addEventListener("click", timeElapsed, false);
} else if (window.attachEvent) {
	document.getElementById("timeButton").attachEvent("click", timeElapsed);
}