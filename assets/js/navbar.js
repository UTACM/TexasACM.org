var header = ""
+  '<h1><a href="index.html">Association for Computing Machinery <span>at UT Austin</span></a></h1>'
+  '	<nav id="nav">'
+  '		<ul>'
+  '			<li>'
+  '				<a href="index.html" class="submenu" id="Home">Home</a>'
+  '				<ul>'
+  '					<li><a href="index.html#mc-embedded-subscribe-form">Mailing List</a></li>'
+  '					<li><a href="index.html#current-iframe">Current Events</a></li>'
+  '					<li><a href="index.html#upcoming-iframe">Upcoming Events</a></li>'
+  '				</ul>'
+  '			</li>'
+  '			<li>'
+  '				<a href="about.html" class="submenu" id="About">About</a>'
+  '				<ul>'
+  '					<li><a href="about.html#about-us">About Us</a></li>'
+  '					<li><a href="about.html#what-we-do">What We Do</a></li>'
+  '					<li><a href="about.html#why-join">Why Join</a></li>'
+  '					<li><a href="about.html#our-team">Our Team</a></li>'
+  '				</ul>'
+  '			</li>'
+  '			<li>'
+  '				<a href="resources.html" class="submenu" id="Resources">Resources</a>'
+  '				<ul>'
+  '					<li><a href="resources.html#become-member">Become a Member</a></li>'
+  '					<li><a href="resources.html#hr-contact">HR Contact</a></li>'
+  '					<li><a href="resources.html#join-mentorship">Mentorship</a></li>'
+  '					<li><a href="resources.html#lockers">Lockers</a></li>'
+  '				</ul>'
+  '			</li>'
+  '			<li><a href="faq.html" class="submenu" id="FAQ">FAQ</a></li>'
+  '			<li><a href="events.html" id="Events">Events</a></li>'
+  '			<li>'
+  '				<a href="corporate.html" class="submenu" id="Corporate">Corporate</a>'
+  '				<ul>'
+  '					<li><a href="corporate.html#sponsor-packages">Packages</a></li>'
+  '					<li><a href="corporate.html#sponsors">Sponsors</a></li>'
+  '				</ul>'
+  '			</li>'
+  '			<li>'
+  '				<a href="forms.html" class="submenu" id="Forms">Forms</a>'
+  '				<ul id="navForms">'
+  '					<li><a href="forms.html?Signin">Sign In</a></li>'
+  '					<li><a href="forms.html?Join">Join ACM</a></li>'
+  '					<li><a href="forms.html?Pc">Prog Comp</a></li>'
+  '					<li><a href="forms.html?Complaints">HR Complaint</a></li>'
+  '				</ul>'
+  '			</li>'
+  '		</ul>'
+  '	</nav>';
document.getElementById("header").innerHTML = header;


// Address of the Google Sheets Database
var public_spreadsheet_url_navbar = 'https://docs.google.com/spreadsheets/d/1KrnAgk7K1xZY5YKLBqA3mzfyBRP8WKxbM6D2czn5QG8/edit?usp=sharing';

function init() {
  Tabletop.init( { key: public_spreadsheet_url_navbar,
    callback: showInfoNav,
    simpleSheet: true } );
  }

  window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded

  // Method that gets called when data has been pulled from Google Sheets
  function showInfoNav(data) {
    var index = 0; // Line 2 is index 0
    var navbarContent = '<header id="header"><h1><a href="index.html" target="_parent">Association for Computing Machinery <span>at UT Austin</span></a></h1><nav id="nav"><ul>';
    //Builds the Forms and Addresses arrays using the Google Sheets Data
    var navbarItemName = [];
    var itemURL = [];
    var url = '';
    var parsedURL = '';
    var firstOccur = 0;
    var topMenu = true;
    var normMenu = true;
    var tempNavbarItemName = '';
    var plainURL = '';
    while (data[index] != null) {
      navbarItemName[index] = data[index].NAVBAR_ITEM_NAME;
      itemURL[index] = data[index].ITEM_URL;

      url = data[index].ITEM_URL;
      var higherIndex = itemURL.indexOf(url.substring(0, url.indexOf('#')));
      if (index > -1) {
        if (url.includes("#")) {
          normMenu = false;
          if (topMenu == true) {
            // Builds menubar item name on the fly
            tempNavbarItemName = tempNavbarItemName + itemURL[index].substring(0, 1).toUpperCase() + itemURL[index].substring(1, itemURL[index].indexOf('.'));
            plainURL = plainURL + itemURL[index].substring(0, itemURL[index].indexOf('#'));
            navbarContent+='<li><a href="' + plainURL + '" target="_parent" class="submenu fa-angle-down">' + tempNavbarItemName + '</a><ul><li><a href="' + itemURL[index] + '" target="_parent">' + navbarItemName[index] + '</a></li>';
            topMenu = false;
          } else {
            navbarContent+= '<li><a href="' + itemURL[index] + '" target="_parent">' + navbarItemName[index] +'</a></li>';
          }
          index++;
        } else {
          if (topMenu == false && normMenu == false) {
            navbarContent+='</ul>';
          }
          normMenu = true;
          if (index == higherIndex) {
            index++;
          } else {
            navbarContent += '<li><a href="'
            + itemURL[index] + '" target="_parent">'
            + navbarItemName[index]
            + '</a></li>';
            index++;
          }
        }
      }

    }
    navbarContent += '</ul></nav></header>';
    // DEBUGGING: Print HTML code before rendering on site
    // alert(navbarContent);

    document.getElementById("navbarContainer").innerHTML = navbarContent;
  }

var topLevelNavLinkIds = ["Home", "About", "Resources", "FAQ", "Projects", "Events", "Corporate", "Forms"];
for (index = 0; index < topLevelNavLinkIds.length; index++) {
	if (document.title.includes(topLevelNavLinkIds[index])) {
		document.getElementById(topLevelNavLinkIds[index]).classList.add("active");
		break;
	}
}
