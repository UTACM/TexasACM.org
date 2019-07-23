// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1vk0d2y8ytko-35esBDPjokwenkpeoHyuOA-Ra2piFxI/edit#gid=0';

// Column Names from Google Sheets Database
let IMG_COL = "IMG_URL";
let YEAR_COL = "YEAR";
let TITLE_COL = "TITLE";
let CONTENT_COL = "CONTENT";

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	var index = 0;
	var html = '<div class="posts">';

  // Builds the HTML code from the Spreadsheet Data
  data.forEach(form =>  {
    html += '<section class="post"><span class="image"><img src="' + data[index][IMG_COL] + '" alt=""></span>' +
      '<div class="content"><h2 style="style: border-bottom: none; padding-bottom: 0em;">' + data[index][YEAR_COL] + '</h2>' +
      '<div class=""><h3>' + data[index][TITLE_COL] + '</h3>' +
      '<p style="height: 40vh; overflow: auto;">' + data[index][CONTENT_COL] + '</p><ul class="actions"></ul></div></section>';
  		index++;
  });
	document.getElementById("historyContainer").innerHTML = html;
}
