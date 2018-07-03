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
    var navbarContent = '<nav id="nav"><ul>';
    //Builds the Forms and Addresses arrays using the Google Sheets Data
    var navbarItemName = [];
    var itemURL = [];
    var url = '';
    var parsedURL = '';
    var firstOccur = 0;
    var topMenu = false;
    var menuEntries = false;
    // var higherIndex;
    while (data[index] != null) {
      navbarItemName[index] = data[index].NAVBAR_ITEM_NAME;
      itemURL[index] = data[index].ITEM_URL;
      url = data[index].ITEM_URL;
      var higherIndex = itemURL.indexOf(url.substring(0, url.indexOf('#')));
      if (index > -1) {
        // window.alert("higherIndex: " + higherIndex);
        // window.alert("index: " + index);
        // window.alert("index before comparison loop: " + index + " higherIndex: " + higherIndex);
        // if (itemURL[higherIndex] == itemURL[index]) {
        if (higherIndex == index) {
          index++;
          window.alert("index after comparison is true: " + index);
        } else {
          if (url.includes("#")) {
            topMenu = true;
            menuEntries = true;
            // window.alert("This is the index of the upper menu item: " + higherIndex);
            if (topMenu == true) {
              navbarContent+='<li><a href="#" class="submenu fa-angle-down">' + navbarItemName[higherIndex] + '</a><ul><li><a href="' + itemURL[index] + '">' + navbarItemName[index] + '</a></li>';
              topMenu = false;
              // index++;
            } else if (menuEntries == true) {
              navbarContent+= '<li><a href="' + itemURL[index] + '">' + navbarItemName[index] +'</a></li>';
              // index++;
            }
            index++;
            // higherIndex = itemURL.indexOf(url.substring(0, url.indexOf('#')));
            // navbarContent+='</ul></li>';
          } else {
            menuEntries = false;
            if (menuEntries == false) {
              navbarContent += '</ul></li>';
            }
            menuEntries = true;
            navbarContent += '<li><a href="'
            + itemURL[index] + '">'
            + navbarItemName[index]
            + '</a></li>';
            index++;
            // higherIndex = itemURL.indexOf(url.substring(0, url.indexOf('#')));
          }
        }
        // navbarContent+='</ul></li>';
      }
      // navbarContent += '</ul></nav>';
      //
      // document.getElementById("navbarContainer").innerHTML = navbarContent;
    }
    navbarContent += '</ul></nav>';

    document.getElementById("navbarContainer").innerHTML = navbarContent;
  }
