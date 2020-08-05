/*
	This code is used for the introduction page's dial puzzle. 
	The user needs to set the year to 1916, and the full page is then revealed.
*/

//global variables for the numbers that the user changes
var num1 = "0";
var num2 = "0";
var num3 = "0";
var num4 = "0";

//function to see if right answer is given.
function checkTotal() {
	if (num1 === 1 && num2 === 9 && num3 === 1 && num4 === 6) {
		document.querySelector('.puzzle').classList.toggle('change');
	} 
	//add a sessionStorage object to say that the puzzle has been solved.
	sessionStorage.setItem('puzzleSolved', true);
}

//functions to increase or decrease a number on the dial
function numUp(i) {
	if (i < 9) {
		i++;
	}
	else {
		i= 0;
	}
	return i;
}
function numDown(i) {
	if (i > 1) {
		i--
	}
	else {
		i = 9;
	}
	return i;
}

//specific functions to update each dial
//+ sign
function plusDial1() {
	num1 = numUp(num1);
	document.getElementById('num1').innerHTML = num1;
	checkTotal();
}
function plusDial2() {
	num2 = numUp(num2);
	document.getElementById('num2').innerHTML = num2;
	checkTotal();
}
function plusDial3() {
	num3 = numUp(num3);
	document.getElementById('num3').innerHTML = num3;
	checkTotal();
}
function plusDial4() {
	num4 = numUp(num4);
	document.getElementById('num4').innerHTML = num4;
	checkTotal();
}
//-sign
function minusDial1() {
	num1 = numDown(num1);
	document.getElementById('num1').innerHTML = num1;
	checkTotal();
}
function minusDial2() {
	num2 = numDown(num2);
	document.getElementById('num2').innerHTML = num2;
	checkTotal();
}
function minusDial3() {
	num3 = numDown(num3);
	document.getElementById('num3').innerHTML = num3;
	checkTotal();
}
function minusDial4() {
	num4 = numDown(num4);
	document.getElementById('num4').innerHTML = num4;
	checkTotal();
}

//these event listeners activate if the plus buttons are pushed.
document.getElementById("plus1").
	addEventListener("click", plusDial1, false);
document.getElementById("plus2").
	addEventListener("click", plusDial2, false);
document.getElementById("plus3").
	addEventListener("click", plusDial3, false);
document.getElementById("plus4").
	addEventListener("click", plusDial4, false);
	
//these event listeners activate if the minus buttons are pushed.
document.getElementById("minus1").
	addEventListener("click", minusDial1, false);
document.getElementById("minus2").
	addEventListener("click", minusDial2, false);
document.getElementById("minus3").
	addEventListener("click", minusDial3, false);
document.getElementById("minus4").
	addEventListener("click", minusDial4, false);

/* 
this code creates a sessionStorage object to see if the user already solved the puzzle.
If they have, then the puzzle is skipped when the user goes to the introduction page.
*/

//function to test for sessionStorage object. If it's present, puzzle doesn't need to be solved again.
function checkPuzzleSolved() {
	if (sessionStorage.getItem('puzzleSolved')) {
		document.querySelector('.puzzle').style.transition = "none";
		document.querySelector('.puzzle').classList.toggle('change');
		//resent the css after a short amount of time, so that the puzzle will work normally if solved again.
		setTimeout(function(){ document.querySelector('.puzzle').style.transition = "z-index 3s step-end, opacity 3s ease-in, height 3s step-end"; }, 10000);
	}
}

//event listener to check for sessionStorage object on page load
window.addEventListener("load", checkPuzzleSolved, false);