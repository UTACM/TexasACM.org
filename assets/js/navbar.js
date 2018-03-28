	// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url_navbar = 'https://docs.google.com/spreadsheets/d/1E4FiRe8tG_8qWenpKSUrWRVwLIjwQsocyG-wCrrN7tY/edit?usp=sharing';

function init() {
Tabletop.init( { key: public_spreadsheet_url_navbar,
                 callback: showInfoNav,
                 simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

// Method that gets called when data has been pulled from Google Sheets
function showInfoNav(data) {
	var navbarContent = "";
	//Builds the Forms and Addresses arrays using the Google Sheets Data


		// Writes HTML code based on Form responses
		// alert(webURL[index] == undefined);
		// link = ""
		// link = webURL[index];

		navbarContent += '<nav id="nav" style="z-index: 10000;"><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About</a></li><li><a href="#" class="submenu fa-angle-down">Membership</a><ul><li><a href="membership.html#benefits">Benefits</a></li><li><a href="membership.html#events">Evenets</a></li><li><a href="membership.html#lockers">Lockers</a></li></ul></li><li><a href="faq.html">FAQ</a></li><li><a href="events.html">Events</a></li><li><a href="http://projects.texasacm.org">Projects</a></li><li><a href="corporate.html">Corporate</a></li><li><a href="forms.html">Forms</a></li></ul></nav>';


	
	document.getElementById("navbarContainer").innerHTML = navbarContent;
}