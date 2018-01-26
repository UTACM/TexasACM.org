// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1RFAdIn5Lz2t0axlfTqKpwsG3kdY_e_7wMkcQ8kZ_wIc/edit?usp=sharing';

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded
var unhiddenAnswer = "";

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	var questions = [];
	var answers = [];
	var index = 0;
	//Takes the data from Google Sheets and builds an array of Questions and an array of Answers
	while (data[index] != null && !(data[index].Question == "" || data[index].Answer == "")) {
		questions[index] = data[index].Question;
		answers[index] = data[index].Answer;
		index++;
	}

	var numberOfEntries = index;
	// Builds the HTML code from the Questions and Answers arrays
	var faq = '<h2>Frequently Asked Questions</h2><div style="padding:0px 5%">';
	for (var index = 0; index < numberOfEntries; index++) {
		faq += '<h1 class="faq_question" onClick="unhideAnswer(' + index + ')">' + questions[index] + '</h1>';
		faq += '<p id="answer' + index + '" class="hideAnswer">' + answers[index] + '</p>';
	}
	faq += '<center><a style="border-bottom: none" href="https://docs.google.com/spreadsheets/d/1RFAdIn5Lz2t0axlfTqKpwsG3kdY_e_7wMkcQ8kZ_wIc/edit#gid=0"><button class="button admin">Edit</button></a></center>';
	// Injects the built HTML code into the div Dynamic
	document.getElementById("dynamic").innerHTML = faq;
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