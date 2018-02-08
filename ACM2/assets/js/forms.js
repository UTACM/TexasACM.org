// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1wwobshcqPMDMPzTL9G1k2cT6bHfVnyw2He2gCFcuBxI/edit?usp=sharing';

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	var forms = [];
	var addresses = [];
	var imbedInACM = [];
	var found = false;
	// Desired Form = query string, aka string after "?" in url
	var desiredForm = (window.location.href).substring((window.location.href).indexOf('?') + 1 );
	var index = 0;
	//Builds the Forms and Addresses arrays using the Google Sheets Data
	while (data[index] != null && !(data[index].Address == "" && data[index].Name == "") && !found) {
		forms[index] = data[index].Name;
		addresses[index] = data[index].Address;
		imbedInACM[index] = embedInACMorNot(data[index].EmbedInACM);
		if (forms[index].toLowerCase()==desiredForm.toLowerCase() && desiredForm != "") {
			found = true;
		}
		index++;
	}
	var numberOfForms = index;

	// If the desired form doesn't exist, or no form is selected as desired
	if (!found) {
		var table = "";
		// If user wants to select a form, but form doesn't exist in Database, say "Form not found."
		if (desiredForm != "" && window.location.href.indexOf('?') != -1) {
			table += "<p>The form <strong>" + desiredForm + "</strong> cannot be found. Here is a list of all forms:</p>";
		}

		// Builds the Table of all forms. 
		table += '<h1 style="text-align:left;">Forms</h1><div id="forms-table-div" style="width:30%; margin:auto; text-align:center;" ><table id="forms-table" style="text-align:left;"><tr><th>List of Available Forms</th></tr>'
		for (index = 0; index < numberOfForms; index++) {
			if (forms[index] != "" && addresses[index] != "") 
				table += "<tr><td><a href='"+"form.html?"+forms[index] + "'>" + forms[index] + "</td></a></td></tr>";
		}
		table += '</table>';
		// Adds the Edit button under the table
		table += '<a style="border-bottom: none" href="https://docs.google.com/spreadsheets/d/1wwobshcqPMDMPzTL9G1k2cT6bHfVnyw2He2gCFcuBxI/edit#gid=0"><button class="button admin">Edit Forms List</button></a>';
		table += '</div>';
		
		document.getElementById("dynamic").innerHTML = table;	        	
		document.title = "All Forms | Texas ACM";
	}

	// If the desired form exists in Database
	else {	
		// If the desired form exists in Database, but no address is available, display Unavailable
		if (addresses[index-1]=="") {
			document.getElementById("dynamic").innerHTML = "<h1>Sorry, Form not available</h1><p>The ACM staff has not specified the form " + desiredForm +"'s address. Please notify an officer and try again later. Thanks</p>";	  
			document.title = "Form not Available | Texas ACM";
		}
		// If the desired form exists in Database
		else {
			// if EmbedInACM is true, embed the form in an iFrame
			if (imbedInACM[index-1]) {
				document.getElementById("dynamic").innerHTML = "<iframe frameborder='0' scrolling='yes' width='100%' height='1000vh' src='"+ addresses[index-1]+"'></iframe>";	  
				document.title = desiredForm + " | Texas ACM";
			}
			// if EmbedInACM is false, imbedInACM directly to URL
			else {
				window.location.replace(addresses[index-1]);
			}

			


		}
	}
}

//Checks the cell to see if it says "no"
function embedInACMorNot(cell) {
	if (!cell=="") {
		if (cell.charAt(0)=='N'||cell.charAt(0)=='n')
			return false;
		else
			return true;
	} else {
		return true;
	}

}