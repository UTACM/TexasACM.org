// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ztxne39u4smNKquHZXnDnHuObXEzDYSABe8cEY0J5-c/edit?usp=sharing';

// Constants for column headers on spreadsheet
// Note: must match EXACTLY what header has! Feel free to use \n
let firstNameColumn = "First Name";
let lastNameColumn = "Last Name";
let positionColumn = "SO Position";
let qualificationsColumn = "Qualifications";
let platformColumn = "Officer Platform";
let miscColumn = "Is there anything else you'd like us to know?";
let orderColumn = "Position Preferences";

// Content vars for each respective ACM office
var presidentialContent = '';
var hrContent = '';
var corporateContent = '';
var internalContent = '';
var academicsContent = '';
var financeContent = '';
var socialContent = '';
var webContent = '';
var marketingContent = '';

// Calls init() when Sheets has loaded
window.addEventListener('DOMContentLoaded', init)
var unhiddenPosition = "";

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
    callback: showInfo,
    simpleSheet: true } );
  }

  // Method that gets called when data has been pulled from Google Sheets
  function showInfo(data) {
    classifyContent(data);
    // Inject platform submissions' content under respective position header in HTML file
    document.getElementById("pres_candidates").innerHTML = presidentialContent;
    document.getElementById("hr_candidates").innerHTML = hrContent;
    document.getElementById("corporate_candidates").innerHTML = corporateContent;
    document.getElementById("internal_candidates").innerHTML = internalContent;
    document.getElementById("academics_candidates").innerHTML = academicsContent;
    document.getElementById("finance_candidates").innerHTML = financeContent;
    document.getElementById("social_candidates").innerHTML = socialContent;
    document.getElementById("web_candidates").innerHTML = webContent;
    document.getElementById("marketing_candidates").innerHTML = marketingContent;
  }

  // For each line in spreadsheet, format platform in HTML.
  // Then check for which positions the platform submission is applicable for
  // and assign it to its respective content var.
  function classifyContent(data) {
      data.forEach(platform => { //this is what you're doing to each
        var unclassifiedContent = buildPositionTable(platform);
        if (platform[positionColumn].includes("President")===true) {
          presidentialContent += unclassifiedContent;
        }
        if (platform[positionColumn].includes("Human Resources")===true) {
          hrContent += unclassifiedContent;
        }
        if (platform[positionColumn].includes("Corporate")===true) {
          corporateContent += unclassifiedContent;
        }
        if (platform[positionColumn].includes("Internal")===true) {
          internalContent += unclassifiedContent;
        }
        if (platform[positionColumn].includes("Academics")===true) {
          academicsContent += unclassifiedContent;
        }
        if (platform[positionColumn].includes("Finance")===true) {
          financeContent += unclassifiedContent;
        }
        if (platform[positionColumn].includes("Social")===true) {
          socialContent += unclassifiedContent;
        }
        if (platform[positionColumn].includes("Webmaster")===true) {
          webContent += unclassifiedContent;
        }
        if (platform[positionColumn].includes("Marketing")===true) {
          marketingContent += unclassifiedContent;
        }
      })
  }

  // Formats spreadsheet content from platform submission form with HTML
  function buildPositionTable(platform) {
    unclassifiedContent = '';
    // Basic submission content (Qualifications and Platform)
    unclassifiedContent += '<h3>' + platform[firstNameColumn] + " " + platform[lastNameColumn] + '</h3>'
    + '<div style="padding-left: 2%; padding-right: 2%" >'
    + '<strong>Qualifications</strong>'
    + '<div style="padding-left: 2%; padding-right: 2%"><p>' + platform[qualificationsColumn].replace('\n', "<br />") + '</p></div>'
    + '<strong>Platform</strong>'
    + '<div style="padding-left: 2%; padding-right: 2%"><p>' + platform[platformColumn].replace('\n', "<br />") + '</p></div>';
    // If the misc colum contains anything, include it
    if (platform[miscColumn].length > 0) {
      unclassifiedContent += '<strong>Other things to know</strong>'
      + '<div style="padding-left: 2%; padding-right: 2%"><p>' + platform[miscColumn].replace('\n', "<br />") + '</p></div>';
    }
    // If the position preferences colum contains anything, include it
    if (platform[orderColumn].length > 0) {
      unclassifiedContent += '<strong>Position Preferences</strong>'
      + '<div style="padding-left: 2%; padding-right: 2%"><p>' + platform[orderColumn] + '</p></div>';
      unclassifiedContent += '</div>'
    }
    return unclassifiedContent;
  }

  // When an SO position gets clicked on, this method will hide the currently displaying answer (if any), and
  // Unhide the answer corresponding to the clicked on answer.
  // If the currently displaying section is the same as the answer corresponding to the clicked on section,
  // it will be hidden and no new section will be unhidden
  function unhidePosition(position) {
    if (position.classList=="hidePosition") {
      position.classList.remove("hidePosition");
    } else {
      position.classList.add("hidePosition");
    }
  }
