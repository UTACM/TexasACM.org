// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1jgLTJmkgsOTjphmzllaBrQKFbWTRiWHbPKTUkSgqDZI/edit?usp=sharing';

// Column Names from Google Sheets Database
let questionsColumn = "Question";
let answersColumn = "Answer";

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

var unhiddenAnswer = "";

function toggleAnswer(num) {
	const answer = document.getElementById(`answer${num}`);
	answer.classList.toggle('hideAnswer');
}

function hideAll(data) {
	for (i in data) {
		answer = document.getElementById(`answer${i}`);
		answer.classList.toggle('hideAnswer');
	}
}

function showAll(data) {
	for (i in data) {
		answer = document.getElementById(`answer${i}`);
		answer.classList.remove('hideAnswer');
	}
}


// Builds the HTML Table code from the Database Data
function buildFAQTable(data) {
	let index = 0;
	let content = '</br></br></br>';

	for (i in data) {
			content += `<h1 class="faq_question" onClick="unhideAnswer(${i})">${data[i][questionsColumn]}</h1>`;
			content += `<p id="answer${i}" class="hideAnswer answer">${data[i][answersColumn]}</p>`;
	}
	content += "<br></br><br></br>";
	return content;
}

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	const hideAllButton = `<center><a style="border-bottom: none"><button id="hide">Expand or Hide All</button></a></center>`;
	document.getElementById("dynamic").innerHTML = hideAllButton + buildFAQTable(data);
	// document.getElementById("expand").onclick = function() {showAll(data)};
	document.getElementById("hide").onclick = function() {hideAll(data)};
}

// When a FAQ Question gets clicked on, this method will hide the currently displaying answer (if any), and
// Unhide the answer corresponding to the clicked on answer.
// If the currently displaying answer is the same as the answer corresponding to the clicked on question,
// it will be hidden and no new answer will be unhidden
function unhideAnswer(number) {
	var answerID = "answer" + number;
	if (answerID != unhiddenAnswer) {
		document.getElementById(answerID).classList.remove("hideAnswer");
	}
	if (unhiddenAnswer != "")
		document.getElementById(unhiddenAnswer).classList.add("hideAnswer");
	if (unhiddenAnswer == answerID)
		unhiddenAnswer = ""
	else
		unhiddenAnswer = answerID;
}

window.addEventListener('DOMContentLoaded', () => {
    Tabletop.init({
        key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: true
    });
}, { once: true })