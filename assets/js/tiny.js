// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
let public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1bHF_1i9F031XrSvlw4g41X4-0ZfG9mpvWiqLdKHh4j0/edit?usp=sharing';
let nameColumn = "Name\n(Must be 1 word)";
let visibilityColumn = "Visibility\n(Visible if Blank)";
let addressColumn = "Address\n(include http:// if external link)";

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

window.addEventListener("DOMContentLoaded", init)	// Calls method init when Sheets has loaded

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	let desiredLink = getQueryString();
	var index = indexOfdesiredLink(data, desiredLink);

	// If the desired link doesn"t exist, or no link is selected as desired
	if (index == -1) {
		var content = "";
		// If user wants to select a link, but link doesn't exist in Database, say 'link not found.'
		if (desiredLink != "") {
			content += "<p>The link <strong>" + desiredLink + "</strong> cannot be found. Here is a list of all links:</p>";
		}
		content += buildAllLinks(data);
		document.getElementById("dynamic").innerHTML = content;
		document.title = "All links | Texas ACM";
	}

	// If the desired link exists in Database
	else {
		showlink(data[index]);
	}
}

function indexOfdesiredLink(data, desiredLink) {
	var index = 0;
	if (desiredLink != "") {
		for (var index = 0; index < data.length; ++index) {
			if (data[index][nameColumn].toLowerCase() == desiredLink.toLowerCase()) {
				return index;
			}
		}
	}
	return -1;
}

function buildAllLinks(data) {
	var content = "<h1 id='forms-h1'>Links</h1>";
	content += "<div id='forms-table-div'>";
	content += "<table id='forms-table'><tr><th>List of Available Links</th></tr>"

	data.forEach(link => {
		if (!hideLinkFromList(link[visibilityColumn]))
		content += "<tr><td><a href='tiny.html?" + link[nameColumn] + "'>" + link[nameColumn] + "</a></td></tr>";
	});
	content += "</table>";

	// Edit button under the table
	content += "<a href='" + public_spreadsheet_url + "'><button class='button admin'>Edit Links List</button></a>";
	console.log(public_spreadsheet_url);
	content += "</div>";
	return content;
}

function getQueryString() {
	var result = "";
	if ((window.location.href).indexOf("?") > 0) {
		result = (window.location.href).substring((window.location.href).indexOf("?") + 1 );
	}
	return result;
}

function showlink(link) {
	// If no address is available for link, display Unavailable
	if (link[addressColumn] == "") {
		document.getElementById("dynamic").innerHTML = "<h1>Sorry, link not available</h1><p>The ACM staff has not specified the link " + link[nameColumn] +"'s address. Please notify an officer and try again later. Thanks</p>";
		document.title = "Link not Available | Texas ACM";
	}
	else {
		window.location.replace(link[addressColumn]);
	}
}

function hideLinkFromList(cell) {
	if (cell == "")
		return false;
	else
		return true;
}
