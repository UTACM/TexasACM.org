// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1F-N9gMW9QjU756B72PgiYQRjeA9qd5vrmXDWqmEn_GQ/edit?usp=sharing';

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {

	
	var index = 0;
	var table = '<h1 style="text-align:left;">Wishlist</h1><div id="forms-table-div" style="width:80%; margin:auto; text-align:center;" ><table id="forms-table" style="text-align:left;"><tr><th>Priority</th><th>Items</th><th>Deadline</th><th>Justification</th></tr>';
	//Builds the Forms and Addresses arrays using the Google Sheets Data
	while (data[index]) {
		if ((data[index].Finished == "")) 
				table += "<tr><td>" + data[index].Importance + "</td><td><a href='"+data[index].AmazonURL + "'>" + data[index].Item + "</td></a><td>" + data[index].Deadline + "</td></td><td><button class='button special' aria-label='" + data[index].Justification + "' onclick='showTT(this)' onmouseout='hideTT(this)'>Show</button></td></tr>";
		index++;
	}
	table += '</table>';
	// Adds the Edit button under the table
	table += '<center><a style="border-bottom: none" href="https://docs.google.com/spreadsheets/d/1F-N9gMW9QjU756B72PgiYQRjeA9qd5vrmXDWqmEn_GQ/edit#gid=41231222" target="_blank"><button class="button admin">Mark Completed</button></a><br><br>';
	table += '<a style="border-bottom: none" href="forms.html?wishlist" target="_blank"><button class="button special">Submit new Request</button></a></center>';
	table += '</div>';
	
	document.getElementById("dynamic").innerHTML = table;			
}