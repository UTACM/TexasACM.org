var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1RFAdIn5Lz2t0axlfTqKpwsG3kdY_e_7wMkcQ8kZ_wIc/edit?usp=sharing';

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init)

var unhiddenAnswer = "";

function showInfo(data) {
	var questions = [];
	var answers = [];
	var index = 0;
	while (data[index] != null && !(data[index].Question == "" || data[index].Answer == "")) {
		questions[index] = data[index].Question;
		answers[index] = data[index].Answer;
		index++;
	}
	var numberOfEntries = index;
	var faq = '<h2>Frequently Asked Questions</h2><div style="padding:0px 5%">';
	for (var index = 0; index < numberOfEntries; index++) {
		faq += '<h1 class="faq_question" onClick="unhideAnswer(' + index + ')">' + questions[index] + '</h1>';
		faq += '<p id="answer' + index + '" class="hideAnswer">' + answers[index] + '</p>';
	}
	faq += '<center><a style="border-bottom: none" href="https://docs.google.com/spreadsheets/d/1RFAdIn5Lz2t0axlfTqKpwsG3kdY_e_7wMkcQ8kZ_wIc/edit#gid=0"><button class="button admin">Edit</button></a></center>';
	document.getElementById("dynamic").innerHTML = faq;


}

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