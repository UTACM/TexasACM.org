var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1wwobshcqPMDMPzTL9G1k2cT6bHfVnyw2He2gCFcuBxI/edit?usp=sharing';

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init)

function showInfo(data) {
		//var numberOfForms = data[0].NumFormsTotal;
	var forms = [];
	var addresses = [];
	var found = false;
	var desiredForm = (window.location.href).substring((window.location.href).indexOf('?') + 1 );
	var index = 0;
	while (data[index] != null && !(data[index].Address == "" && data[index].Name == "") && !found) {
		forms[index] = data[index].Name;
		addresses[index] = data[index].Address;
		if (forms[index].toLowerCase()==desiredForm.toLowerCase() && desiredForm != "") {
			found = true;
		}
		index++;
	}
	var numberOfForms = index;
	if (!found) {
		var table = "<h1 style='text-align:left;''>Forms</h1><div id='forms-table-div' style='width:40%;margin:auto;''><table id='forms-table'><tr><th>Form Name</th><th>Address</th></tr>"
		for (index = 0; index < numberOfForms; index++) {
			if (forms[index] != "" && addresses[index] != "")
			table += "<tr><td>" + forms[index] + "</td><td><a href='"+"form.html?"+forms[index] + "'>Link</a></td></tr>";
		}
		table += '</table><a href="https://docs.google.com/spreadsheets/d/1wwobshcqPMDMPzTL9G1k2cT6bHfVnyw2He2gCFcuBxI/edit#gid=0"><button class="button admin" >Edit Forms List</button></a></div>';
		if (desiredForm != "" && window.location.href.indexOf('?') != -1) {
			table = "<p>The form <strong>" + desiredForm + "</strong> cannot be found. Here is a list of all forms:</p>" + table;
		}
		document.getElementById("dynamic").innerHTML = table;	        	
		document.title = "All Forms | Texas ACM";
	}
	else {
		if (addresses[index-1]=="") {
			document.getElementById("dynamic").innerHTML = "<h1>Sorry, Form not available</h1><p>The ACM staff has not specified the form " + desiredForm +"'s address. Please notify an officer and try again later. Thanks</p>";	  
			document.title = "Form not Available | Texas ACM";
		}
		else {
			document.getElementById("dynamic").innerHTML = "<iframe frameborder='0' scrolling='yes' width='100%' height='1000vh' src='"+ addresses[index-1]+"'></iframe>";	  
			document.title = desiredForm + " | Texas ACM";

		}
	}
}