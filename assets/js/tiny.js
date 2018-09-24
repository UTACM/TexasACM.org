// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1bHF_1i9F031XrSvlw4g41X4-0ZfG9mpvWiqLdKHh4j0/edit?usp=sharing';

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	var nameColumnTitle = "Name\n(Must be 1 word)";
	var addressColumnTitle = "Address\n(include http:// if external link)";
	var links = [];
	var addresses = [];
	var found = false;
	// Desired link = query string, aka string after "?" in url
	var desiredlink = (window.location.href).substring((window.location.href).indexOf('?') + 1 );
	var index = 0;
	//Builds the links and Addresses arrays using the Google Sheets Data
	while (data[index] != undefined && !(data[index][addressColumnTitle] == "" && data[index][nameColumnTitle] == "") && !found) {
		links[index] = data[index][nameColumnTitle];
		addresses[index] = data[index][addressColumnTitle];
		if (links[index] != undefined && links[index].toLowerCase()==desiredlink.toLowerCase() && desiredlink != "") {
			found = true;
		}
		index++;
	}
	var numberOflinks = index;

	// If the desired link doesn't exist, or no link is selected as desired
	if (!found) {
		var table = "";
		// If user wants to select a link, but link doesn't exist in Database, say "link not found."
		if (desiredlink != "" && window.location.href.indexOf('?') != -1) {
			table += "<p>The link <strong>" + desiredlink + "</strong> cannot be found. Here is a list of all links:</p>";
		}

		// Builds the Table of all links. 
		table += '<h1 style="text-align:left;">Links</h1><div id="links-table-div" style="width:30%; margin:auto; text-align:center;" ><table id="links-table" style="text-align:left;"><tr><th>List of Available links</th></tr>'
		for (index = 0; index < numberOflinks; index++) {
			if (links[index] != "" && addresses[index] != "") 
				table += "<tr><td><a href='"+addresses[index] + "'>" + links[index] + "</td></a></td></tr>";
		}
		table += '</table>';
		// Adds the Edit button under the table
		table += '<a style="border-bottom: none" href="https://docs.google.com/spreadsheets/d/1bHF_1i9F031XrSvlw4g41X4-0ZfG9mpvWiqLdKHh4j0/edit#gid=0"><button class="button admin">Edit links List</button></a>';
		table += '</div>';
		
		document.getElementById("dynamic").innerHTML = table;	        	
		document.title = "All Urls | Texas ACM";
	}

	// If the desired link exists in Database
	else {	
		// If the desired link exists in Database, but no address is available, display Unavailable
		if (addresses[index-1]=="") {
			document.getElementById("dynamic").innerHTML = "<h1>Sorry, link not available</h1><p>The ACM staff has not specified the link " + desiredlink +"'s address. Please notify an officer and try again later. Thanks</p>";	  
			document.title = "Url not Available | Texas ACM";
		}
		// If the desired link exists in Database
		else {
			window.location.replace(addresses[index-1]);
		}
	}
}