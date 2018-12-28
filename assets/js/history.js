// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1vk0d2y8ytko-35esBDPjokwenkpeoHyuOA-Ra2piFxI/edit#gid=0';

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	var imgURL = [];
	var title = [];
  var content = [];
	// line 2 is index 0
	var index = 0;
	var html = '<h2>Etiam sed tellus</h2><div class="posts">';
	//Builds the Forms and Addresses arrays using the Google Sheets Data
	//  var[index] = data[index]<COL_NAME>
	while (data[index] != null) {
		imgURL[index] = data[index].IMG_URL;
    title[index] = data[index].TITLE;
    content[index] = data[index].CONTENT;
		html += '<section class="post"><span class="image"><img src="' + imgURL[index] + '" alt=""></span>' +
    '<div class="content"><h3>' + title[index] + '</h3>' +
    '<p>' + content[index] + '</p><ul class="actions"></ul></div></section>';
		index++;

	}
	document.getElementById("historyContainer").innerHTML = html;
}
