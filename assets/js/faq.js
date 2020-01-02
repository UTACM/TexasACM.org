// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1RFAdIn5Lz2t0axlfTqKpwsG3kdY_e_7wMkcQ8kZ_wIc/edit?usp=sharing';

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

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	var editButton = '<center><a style="border-bottom: none" href="' + public_spreadsheet_url + '"><button class="button admin">Edit</button></a></center>';

	// Injects the built HTML code into the div Dynamic
	document.getElementById("dynamic").innerHTML = buildFAQTable(data) + editButton;
}

// Builds the HTML Table code from the Database Data
function buildFAQTable(data) {
	var index = 0;
	var content = '<h2>Frequently Asked Questions</h2><div style="padding:0px 5%">';
	data.forEach(form => {
		content += '<h1 class="faq_question" onClick="unhideAnswer(' + index + ')">' + data[index][questionsColumn] + '</h1>';
		content += '<p id="answer' + index + '" class="hideAnswer">' + data[index][answersColumn] + '</p>';
		index++;
	});
  // Extends body to accomdate for tall footer on very small devices (e.g. iPhone 5/5S/SE)
  content += "<br></br><br></br>";
	return content;
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
