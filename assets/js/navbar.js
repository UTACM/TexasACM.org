// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

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
