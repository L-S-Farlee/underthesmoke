/*
	CaseProject
	Levi Farlee
	SDEV 250
	
	This code is used for the form on the About page.
	After submitting, the user will either be given
	
	(radio buttons)
	a. an alert with a warning that one button must be selected, OR
	b. a message with info on which button was picked
	
	(checkboxes IF error is selected)
	a. an alert that at least one page must be selected
	b. a message with info which pages were selected
	
	(textbox)
	a. a warning that the email isn't formatted correctly (lacks @)
	b. a message with info on what email was submitted.
	
	(textarea)
	a. an alert with an error (for an empty form), OR 
	b. a message of success (displayed on the page itself).
	
	NOTE: This form does not actually work with any php. This is just for building html/css/javascript.
*/

//global variables
var userText;
var radioSelected;
var emailText;
var resultText = document.getElementById("formSuccess").innerHTML;
var radioSuccess = false;
var emailSuccess = false;
var messageSuccess = false;

//function to handle form submission. Uses exception handler to throw any errors.
function checkForm() {
	resultText = "";
	checkRadioButtons();
	if (radioSelected === "Error / Technical") {
		processPageCheckbox();
	}
	checkEmail();
	checkTextArea();
	
	//if everything checks out, then reset form for next use
	if (radioSuccess === true && emailSuccess === true && messageSuccess === true) {
		document.getElementById("formSuccess").innerHTML = resultText;
		//reset radio buttons
		radioComment.checked = false;
		radioError.checked = false;
		radioSelected = ""
		//reset email textbox
		document.getElementById("emailTxtBox").value = "";
		//reset message textarea
		document.getElementById("txtbox").value = "";
		//hide checkboxes for page errors
		hidePageCheckbox();
	}
}

//function to check the radio button selected, alerts if no radio button is selected
function checkRadioButtons() {
	//create variables to represent the buttons
	radioComment = document.getElementById("radioComment");
	radioError = document.getElementById("radioError");
	//check the radioObject.checked object to see if they're checked
	//deal with error, and then assign the value to the resultText
	try {
		if (!radioComment.checked && !radioError.checked) {
			throw "ERROR: Please use buttons to declare which kind of message you are sending."
		}
		if (radioComment.checked) {
			radioSelected = "Comment / Suggestion";
			radioSuccess = true;
		} else if (radioError.checked) {
			radioSelected = "Error / Technical";
			radioSuccess = true;
		}
	} catch(radioError) {
		window.alert(radioError);
		radioSuccess = false;
	} finally {
		//add radio button used to the result text
		resultText = "Success! The following message has bent sent:" + "<br \><br \>" + radioSelected + "<br><br>";
		//reset
	}
}

//function to let user choose which page their error was on
function displayPageCheckbox() {
	//use querySelector to change css style and display the checkboxes
	var displayCheckbox = document.querySelector("#checkList");
	displayCheckbox.style.display = "block";
	
	
}

//see what checkboxes the user selected
function processPageCheckbox() {
	//create variables to get page elements
	var chkIntro = document.getElementById("introPage");
	var chkPoems = document.getElementById("poemsPage");
	var chkPoet = document.getElementById("poetPage");
	var chkCity = document.getElementById("cityPage");
	var chkAbout = document.getElementById("aboutPage");
	var arrayToString = "";
	
	try {
		//see which checkboxes were selected, add to array
		var pagesArrayTest = [chkIntro,chkPoems,chkPoet,chkCity,chkAbout];
		var pagesArrayFinal = [];
		for (i = 0; i < pagesArrayTest.length; i++) {
			if (pagesArrayTest[i].checked === true) {
				pagesArrayFinal.push(pagesArrayTest[i]);
			}
		}
		
		//make sure at least one checkbox was selected
		if (pagesArrayFinal.length === 0) {
			throw "ERROR: Please select at least one page that you found an error on.";
		}
		
		//if the final array's not empty, create a string to put in message
		if (pagesArrayFinal.length > 0 && pagesArrayFinal.length < 2) {
			for (i = 0; i < pagesArrayFinal.length; i++) {
				arrayToString += pagesArrayFinal[i].value;
			}
			resultText += "Page: " + arrayToString + "<br><br>";
		} else if (pagesArrayFinal.length > 1) {
			for (i = 0; i < pagesArrayFinal.length; i++) {
				arrayToString += pagesArrayFinal[i].value + ", ";
			}
			resultText += "Pages: " + arrayToString + "<br><br>";
	}
	} catch(msg) { //display the error
		window.alert(msg);
		radioSuccess = false;
	}
}

//function to hide the page checkbox div
function hidePageCheckbox() {
	//use querySelector to change css style and display the checkboxes
	var displayCheckbox = document.querySelector("#checkList");
	displayCheckbox.style.display = "none";
}

//function to check the radio button selected, alerts if no radio button is selected
function checkEmail() {
	//get email text
	emailText = document.getElementById("emailTxtBox").value;
	try {
		//check to see if "@" or "." character is in a non-empty email string
		if (!(emailText === "") && (!(emailText.includes("@")) || !(emailText.includes(".")))) {
			throw "ERROR: Please make sure your email address is valid."
		} else {
			emailSuccess = true;
		}
	} catch(emailError) {
		window.alert(emailError);
		emailSuccess = false;
	} finally {
		//if there is an email given, then add to result text (otherwise ignore)
		if (!(emailText === "")) {
			resultText += emailText + "<br><br>";
		}
		emailText = "";
	}
}


//function to check the radio button selected, alerts if no radio button is selected
function checkTextArea() {
	try {
		//get user message
		userText = document.getElementById("txtbox").value;
		//make sure message isn't empty
		if (userText === "") {
			throw "ERROR: The form is empty. Please write a message and then submit.";
		} else {
			resultText += userText;
			messageSuccess = true;
		}
	}
	catch(emptyForm) {
		window.alert(emptyForm);
		messageSuccess = false
	}
	finally {
		userText = "";
	}
}

//functions to validate/escape HTML characters after user finishes typing in email or textarea
function validateTextArea() {
	document.getElementById("txtbox").value.replace("<","&lt;");
	document.getElementById("txtbox").value.replace(">","&gt;");
}	
function validateEmail() {
	document.getElementById("emailTxtBox").value.replace("<","&lt;");
	document.getElementById("emailTxtBox").value.replace(">","&gt;");
}	

//These event listeners activate on user comment submission (and several other element interactions).
if (window.addEventListener) {
	document.getElementById("txtbox_s").addEventListener("click", checkForm, false);
	document.getElementById("radioComment").addEventListener("click", hidePageCheckbox, false);
	document.getElementById("txtbox").addEventListener("blur", validateTextArea, false);
	document.getElementById("emailTxtBox").addEventListener("blur", validateEmail, false);
} else if (window.attachEvent) {
	document.getElementById("txtbox_s").attachEvent("onclick", checkForm);
	document.getElementById("radioComment").attachEvent("onclick", hidePageCheckbox);
	document.getElementById("txtbox").attachEvent("onblur", checkForm);
	document.getElementById("emailTxtBox").attachEvent("onblur", checkForm);
}

//This event listener activates on radioButton (error) click
if (window.addEventListener) {
	document.getElementById("radioError").addEventListener("click", displayPageCheckbox, false);
} else if (window.attachEvent) {
	document.getElementById("radioError").attachEvent("onclick", displayPageCheckbox);
}
