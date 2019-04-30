// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1RFAdIn5Lz2t0axlfTqKpwsG3kdY_e_7wMkcQ8kZ_wIc/edit?usp=sharing';

// Column Names from Google Sheets Database
let questionsColumn = "Question";
let answersColumn = "Answer";

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

function init() {
// Tabletop.init( { key: public_spreadsheet_url,
//                  callback: showInfo,
//                  simpleSheet: true } );
  showInfo(getStaticJSON());
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

function getStaticJSON() {
  var data = [
    {
      [questionsColumn]: "How do I become a member?",
      [answersColumn]: "Once you come to an event, you are an ACM member! Want to make it official? You can fill out <a href=\"http://texasacm.org/forms?join\" target=\"_blank\">this</a> form to help us with our records!"
    },
    {
      [questionsColumn]: "How do I get a locker?",
      [answersColumn]: "Getting a locker is very easy. Check <a href=\"/resources.html#lockers\">here</a> to see how!"
    },
    {
      [questionsColumn]: "What are your bylaws (rules) ?",
      [answersColumn]: "You can find them <a href=\"http://texasacm.org/assets/documents/bylaws.pdf\">here</a>!"
    },
    {
      [questionsColumn]: "What is the purpose of ACM?",
      [answersColumn]: "ACM serves to create a sense of community for students, and organizes many social and professional events. See our <a href=\"http://texasacm.org/about.html\" target=\"_blank\">About Page</a> for more details."
    },
    {
      [questionsColumn]: "What sort of events does ACM organize?",
      [answersColumn]: "ACM organizes a variety of <a href=\"http://texasacm.org/membership.html#events\" target=\"_blank\">events</a>. In addition to running most of UT's programming competitions, we organize tutoring and lecture series with professors, professional networking events where companies come to speak, and social events as well."
    },
    {
      [questionsColumn]: "How can I get more involved with ACM?",
      [answersColumn]: "You are always welcome to hang out in our office, and come to our many events. To know when these events are, check out our <a href=\"http://texasacm.org/events.html\">Calendar</a> and <a href=\"https://www.facebook.com/groups/texas.acm/\">Facebook Group</a>."
    },
    {
      [questionsColumn]: "How do I become an officer?",
      [answersColumn]: "Our last general meeting at the end of Spring semester is when we hold our elections for Senior Officers! We will have information leading up to elections about how to become a candidate.<br/>Operational Officers who serve under their repective Senior Officers are chosen in the Fall semester. Come see us during this time to learn more about OOs. It's great training if you are interested in becoming a Senior Officer at some point in the future."
    },
    {
      [questionsColumn]: "Can I join if I'm not in CS, or if I'm a grad student?",
      [answersColumn]: "Absolutely! We welcome all students who are interested in computing or just looking to find a group of friends."
    }
  ];
  return data;
}
