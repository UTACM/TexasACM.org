// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
let public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1bHF_1i9F031XrSvlw4g41X4-0ZfG9mpvWiqLdKHh4j0/edit?usp=sharing';

// Column Names from Google Sheets Database
let nameColumn = "Name\n(Must be 1 word)";
let visibilityColumn = "Visibility\n(Visible if Blank)";
let addressColumn = "Address\n(include http:// if external link)";

window.addEventListener("DOMContentLoaded", init)	// Calls method init when Sheets has loaded

function init() {
// Tabletop.init( { key: public_spreadsheet_url,
//                  callback: showInfo,
//                  simpleSheet: true } );
	showInfo(getStaticJSON())
}

// Static JSON handmade from Google Sheets
function getStaticJSON() {
	var data = [
		{
			[nameColumn]: "Resume",
			[visibilityColumn]: "",
			[addressColumn]: "https://apps.cs.utexas.edu/resume/login.scgi"
		},
		{
			[nameColumn]: "Requirements",
			[visibilityColumn]: "",
			[addressColumn]: "https://docs.google.com/document/d/1UbS-NDvMw3lf7ULyUyYdi1esXkD4t1sX89zonE8Hc9Y"
		},
		{
			[nameColumn]: "CrackingTheCode",
			[visibilityColumn]: "",
			[addressColumn]: "https://drive.google.com/file/d/1EwgfD07DunT6Ob9W-51E68KnmnL9caAW/view"
		},
		{
			[nameColumn]: "CS101",
			[visibilityColumn]: "",
			[addressColumn]: "https://forms.gle/VXabX4oAh6xmuGHE7?fbclid=IwAR1ZfFt78ANfxSTAg-LoRuncaoxxIceG-mTsYczwO-jRK-YY_b9rLSYDk_s"
		},
		{
			[nameColumn]: "Discord",
			[visibilityColumn]: "",
			[addressColumn]: "https://discord.gg/dSytnYX "
		},
		{
			[nameColumn]: "Survey",
			[visibilityColumn]: "",
			[addressColumn]: "https://forms.gle/g2AqPW15DRoYARic8"
		},
		{
			[nameColumn]: "SocialSurvey",
			[visibilityColumn]: "",
			[addressColumn]: "https://docs.google.com/forms/d/e/1FAIpQLSfHLtzoW8wal6cRo6zI3zi5NRzCSwo0etjcesNeQp-QAlhZuw/viewform"
		}
	];
	return data
}

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