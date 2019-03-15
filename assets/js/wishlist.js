// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1F-N9gMW9QjU756B72PgiYQRjeA9qd5vrmXDWqmEn_GQ/edit?usp=sharing';

// Column Names from Google Sheets Database
var itemColumn = "Item";
var urlColumn = "AmazonURL";
var deadlineColumn = "Deadline";
var importanceColumn = "Importance";
var justificationColumn = "Justification";
var finishedColumn = "Finished";

window.addEventListener('DOMContentLoaded', init) 	// Calls method init when Sheets has loaded

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	var table = '<h1 style="text-align:left;">Wishlist</h1><div id="forms-table-div" style="width:80%; margin:auto; text-align:center;" ><table id="forms-table" style="text-align:left;"><tr><th>Priority</th><th>Items</th><th>Deadline</th><th>Justification</th></tr>';

	//Builds the Forms and Addresses arrays using the Google Sheets Data
	data.forEach(request => {
		if ((request[finishedColumn] == ""))
			table += "<tr><td>" + request[itemColumn] + "</td><td><a href='"+ request[urlColumn] + "'>" + request[itemColumn] + "</td></a><td>" + request[deadlineColumn] + "</td></td><td><button class='button special' aria-label='" + request[justificationColumn] + "' onclick='showTT(this)' onmouseout='hideTT(this)'>Show</button></td></tr>";
	});
	table += '</table>';

	// Adds the Edit button under the table
	var editButton = '<center><a style="border-bottom: none" href="' + public_spreadsheet_url + '" target="_blank"><button class="button admin">Mark Completed</button></a><br><br>';
	var newRequestButton = '<a style="border-bottom: none" href="forms.html?wishlist" target="_blank"><button class="button special">Submit new Request</button></a></center>';
  	var kanbanBoardButton = '<a style="border-bottom: none" href="https://trello.com/b/2Qum6OQt/texasacm-finance" target="_blank"><button class="button special">View Kanban Board</button></a></center>';

  	table += editButton + newRequestButton + kanbanBoardButton;
	table += '</div>';

	document.getElementById("dynamic").innerHTML = table;
}
