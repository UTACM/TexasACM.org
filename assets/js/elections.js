// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1hFKtkMFVtVstEp6-yJWl0GNE9Xn8uErMGQ4XmRznbzs/edit?usp=sharing';

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	//Note: If the column name is multiword, that is fine, since
	// data[0].Name === data[0]["Name"]. So, you can write: data[0]["First Name"]
	// var presidential_table = "Not yet available...";
	// var hr_table = "Not yet available...";
	// var corporate_table = "Not yet available...";
	// var internal_table = "Not yet available...";
	// var academics_table = "Not yet available...";
	// var finance_table = "Not yet available...";
	// var social_table = "Not yet available...";
	// var web_table = "Not yet available...";
	// var cp_table = "Not yet available...";

	var presidential_table = "";
	var hr_table = "";
	var corporate_table = "";
	var internal_table = "";
	var academics_table = "";
	var finance_table = "";
	var social_table = "";
	var web_table = "";
	var cp_table = "";
	var index = 0;
	var testing = "";


	// alert("A");
	// alert(data[0]["SO Position"].includes("President")===true);
	while (data[index] != null) {
		var firstName = data[index]['First Name'];
		var lastName = data[index]["Last Name"];
		var officerPos = data[index]["SO Position"];
		var qualifications = data[index]["Qualifications"];
		var platform = data[index]["Officer Platform"];
		var misc = data[index]["Is there anything else you'd like us to know?"];
		var order = data[index]["Position Preferences"];

		var internalContent = '<h3>' + firstName + " " + lastName + '</h3>' 
			+ '<div style="padding-left: 2%; padding-right: 2%">'
			+ '<strong>Qualifications</strong>'
			+ '<div style="padding-left: 2%; padding-right: 2%"><p>' + qualifications.replace('\n', "<br />") + '</p></div>'
			+ '<strong>Platform</strong>'
			+ '<div style="padding-left: 2%; padding-right: 2%"><p>' + platform.replace('\n', "<br />") + '</p></div>';
		if (misc.length > 0)
			internalContent += '<strong>Other things to know</strong>'
			+ '<div style="padding-left: 2%; padding-right: 2%"><p>' + misc.replace('\n', "<br />") + '</p></div>';
		if (order.length > 0)
			internalContent += '<strong>Position Preferences</strong>'
			+ '<div style="padding-left: 2%; padding-right: 2%"><p>' + order + '</p></div>';
		internalContent += '</div>';

		if (data[index]["SO Position"].includes("President")===true) {
			presidential_table += internalContent;
		}
		if (data[index]["SO Position"].includes("Human Resources")===true) {
			hr_table += internalContent;
		}
		if (data[index]["SO Position"].includes("Corporate")===true) {
			corporate_table += internalContent;
		}
		if (data[index]["SO Position"].includes("Internal")===true) {
			internal_table += internalContent;
		}
		if (data[index]["SO Position"].includes("Academics")===true) {
			academics_table += internalContent;
		}
		if (data[index]["SO Position"].includes("Finance")===true) {
			finance_table += internalContent;
		}
		if (data[index]["SO Position"].includes("Social")===true) {
			social_table += internalContent;
		}
		if (data[index]["SO Position"].includes("Webmaster")===true) {
			web_table += internalContent;
		}
		if (data[index]["SO Position"].includes("Competitive Programming")===true) {
			cp_table += internalContent;
		}


		// Writes HTML code based on Form responses
		// alert(webURL[index] == undefined);
		// link = "";
		// link = webURL[index];

		// testing += '<h3>' + firstName + " " + lastName + '</h3>' 
		// + '<p>' + platform + '</p>'
		// + '<p>' + misc + '</p>'
		// + '<p>' + qualifications + '</p>';


		index++;
	}

	// document.getElementById("testing").innerHTML = testing;
	document.getElementById("pres_candidates").innerHTML = presidential_table;
	document.getElementById("hr_candidates").innerHTML = hr_table;
	document.getElementById("corporate_candidates").innerHTML = corporate_table;
	document.getElementById("internal_candidates").innerHTML = internal_table;
	document.getElementById("academics_candidates").innerHTML = academics_table;
	document.getElementById("finance_candidates").innerHTML = finance_table;
	document.getElementById("social_candidates").innerHTML = social_table;
	document.getElementById("web_candidates").innerHTML = web_table;
	document.getElementById("cp_candidates").innerHTML = cp_table;
}
