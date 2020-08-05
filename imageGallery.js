/*
	CaseProject
	Levi Farlee
	SDEV 250
	
	This script creates an image gallery for the bio.html page.
	There are three images, selectable by the arrows on either side of the div.
	Pressing an arrow changes a counter, which in turn changes the src element of the img element.
*/

//global variables
var imgElement = document.getElementById("imgGallery");
currentIndex = 1;

//function to display the currently selected image
function displayImgGallery() {
	imgElement.src = "images\\sandburg" + currentIndex + ".jpg";
}

//functions to handle left & right buttons
function buttonLeft() {
	if (currentIndex > 1) {
		currentIndex--;
		displayImgGallery();
	} else if (currentIndex === 1) {
		currentIndex = 3;
		displayImgGallery();
	}
}

function buttonRight() {
	if (currentIndex < 3) {
		currentIndex++;
		displayImgGallery();
	} else if (currentIndex === 3) {
		currentIndex = 1;
		displayImgGallery();
	}
}

//create event listeners
window.addEventListener("load", displayImgGallery, false);
document.getElementById("btnL").addEventListener("click", buttonLeft, false);
document.getElementById("btnR").addEventListener("click", buttonRight, false);
