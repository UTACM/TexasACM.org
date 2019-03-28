// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ztxne39u4smNKquHZXnDnHuObXEzDYSABe8cEY0J5-c/edit?usp=sharing';

let firstNameColumn = "First Name";
let lastNameColumn = "Last Name";
let positionColumn = "SO Position";
let qualificationsColumn = "Qualifications";
let platformColumn = "Officer Platform";
let miscColumn = "Is there anything else you'd like us to know?";
let orderColumn = "Position Preferences";

// Distinct Offices Content
var presidentContent = '';
var hrContent = '';
var corporateContent = '';
var internalContent = '';
var academicsContent = '';
var financeContent = '';
var socialContent = '';
var webContent = '';
var marketingContent = '';

//
var presidential_table = '';
var hr_table = '';
var corporate_table = '';
var internal_table = '';
var academics_table = '';
var finance_table = '';
var social_table = '';
var web_table = '';
var marketing_table = '';

window.addEventListener('DOMContentLoaded', init)	// Calls method init when Sheets has loaded
var unhiddenPosition = "";

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
    callback: showInfo,
    simpleSheet: true } );
  }

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

    buildPositionTable(data);

    document.getElementById("pres_candidates").innerHTML = presidential_table;
    document.getElementById("hr_candidates").innerHTML = hr_table;
    document.getElementById("corporate_candidates").innerHTML = corporate_table;
    document.getElementById("internal_candidates").innerHTML = internal_table;
    document.getElementById("academics_candidates").innerHTML = academics_table;
    document.getElementById("finance_candidates").innerHTML = finance_table;
    document.getElementById("social_candidates").innerHTML = social_table;
    document.getElementById("web_candidates").innerHTML = web_table;
    document.getElementById("marketing_candidates").innerHTML = marketing_table;
  }

  function buildPositionTable(data) {
    var index = 0;
    unclassifiedContent = '';
    while (data[index] != null) {	//Why nested loop over the data? for each will go through each of the valid submissions already
      data.forEach(form => { //this is what you're doing to each 
      	//Also, each "submission" or data[index] is now called form. instead of data[index][lastname], you can do form[lastname]
      	//You should rename it to not form though
        '<h3>' + data[index][firstNameColumn] + " " + data[index][lastNameColumn] + '</h3>'
        + '<div style="padding-left: 2%; padding-right: 2%" >'
        + '<strong>Qualifications</strong>'
        + '<div style="padding-left: 2%; padding-right: 2%"><p>' + data[index][qualificationsColumn].replace('\n', "<br />") + '</p></div>'
        + '<strong>Platform</strong>'
        + '<div style="padding-left: 2%; padding-right: 2%"><p>' + data[index][platformColumn].replace('\n', "<br />") + '</p></div>';
      })	//if you're ending the for each here, what is this chunk of code under this line do? Trash? 
      '<h3>' + data[index][firstNameColumn] + " " + data[index][lastNameColumn] + '</h3>'
      + '<div style="padding-left: 2%; padding-right: 2%" >'
      + '<strong>Qualifications</strong>'
      + '<div style="padding-left: 2%; padding-right: 2%"><p>' + data[index][qualificationsColumn].replace('\n', "<br />") + '</p></div>'
      + '<strong>Platform</strong>'
      + '<div style="padding-left: 2%; padding-right: 2%"><p>' + data[index][platformColumn].replace('\n', "<br />") + '</p></div>';
      if (data[index][miscColumn].length > 0)
      unclassifiedContent += '<strong>Other things to know</strong>'
      + '<div style="padding-left: 2%; padding-right: 2%"><p>' + data[index][miscColumn].replace('\n', "<br />") + '</p></div>';
      if (data[index][orderColumn].length > 0)
      unclassifiedContent += '<strong>Position Preferences</strong>'
      + '<div style="padding-left: 2%; padding-right: 2%"><p>' + data[index][orderColumn] + '</p></div>';
      unclassifiedContent += '</div>'
      index++;
    }

    // for each unclassified submission, classify it and appended it to the correct table. So this below code should all be inside 
    // Also, none of these tables are declared. Declare it outside the foreach scope and put it before the foreach loop
    if (data[index][positionColumn].includes("President")===true) {
      presidential_table += unclassifiedContent;
    }
    if (data[index][positionColumn].includes("Human Resources")===true) {
      hr_table += unclassifiedContent;
    }
    if (data[index][positionColumn].includes("Corporate")===true) {
      corporate_table += unclassifiedContent;
    }
    if (data[index][positionColumn].includes("Internal")===true) {
      internal_table += unclassifiedContent;
    }
    if (data[index][positionColumn].includes("Academics")===true) {
      academics_table += unclassifiedContent;
    }
    if (data[index][positionColumn].includes("Finance")===true) {
      finance_table += unclassifiedContent;
    }
    if (data[index][positionColumn].includes("Social")===true) {
      social_table += unclassifiedContent;
    }
    if (data[index][positionColumn].includes("Webmaster")===true) {
      web_table += unclassifiedContent;
    }
    if (data[index][positionColumn].includes("Marketing")===true) {
      cp_table += unclassifiedContent;
    }
  }

  // When a FAQ Question gets clicked on, this method will hide the currently displaying answer (if any), and
  // Unhide the answer corresponding to the clicked on answer.
  // If the currently displaying answer is the same as the answer corresponding to the clicked on question,
  // it will be hidden and no new answer will be unhidden
  function unhidePosition(position) {
    if (position.classList=="hidePosition") {
      position.classList.remove("hidePosition");
    } else {
      position.classList.add("hidePosition");
    }
  }
