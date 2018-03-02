// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1XFqwyNej6HFJLp37gHewvZnR-_PiS9ErqprtOgowqLw/edit#gid=0';

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	var imgURL = [];
	var webURL = [];
	// line 2 is index 0
	var index = 0;
	var html = "";
	//Builds the Forms and Addresses arrays using the Google Sheets Data
	//  var[index] = data[index]<COL_NAME>
	while (data[index] != null) {
		imgURL[index] = data[index].IMG_URL;
		html += '<article><img src="' + imgURL[index] + '" alt="" /><div class="inner"></div></article>';
		index++;

	}
	document.getElementById("slideshowContainer").innerHTML = html;
}