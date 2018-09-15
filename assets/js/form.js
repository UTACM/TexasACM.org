// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js
// Address of the Google Sheets Database
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1MJWFqTnyk0IyefnVjbgeLKVd5NRp8ucPkJYVpCdZIvM/edit?usp=sharing';
var htmlContent = "";
var searchedEID = "";

function testResults(form) {
    searchedEID = form.inputbox.value;
    alert ("You typed: " + searchedEID);
}

function init() {
   Tabletop.init({
      key: public_spreadsheet_url,
      callback: showInfo,
      simpleSheet: true
   });
}

window.addEventListener('DOMContentLoaded', init) // Calls method init when Sheets has loaded

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
   var eid = [];
   var firstname = [];
   var lastname = [];
   var email = [];
   var classification = [];
   var gender = [];
   var shirtsize = [];
   var major = [];
   var newsletter = [];
   var hackerrank = [];
   var shareemail = [];
   var resume = [];

   //Builds the Forms and Addresses arrays using the Google Sheets Data
   //  var[index] = data[index]<COL_NAME>
   while (data[index] != null) {
      eid[index] = data[index].UT_EID;
      firstname[index] = data[index].First_Name;
      lastname[index] = data[index].Last_Name;
      email[index] = data[index].Email;
      classification[index] = data[index].Classification;
      gender[index] = data[index].Gender;
      shirtsize[index] = data[index].Shirt_Size;
      major[index] = data[index].Newsletter;
      hackerrank[index] = data[index].Hackerrank;
      shareemail[index] = data[index].Share_email;
      resume[index] = data[index].Resume;

      if (printDate) {
      //
      }
      index++;
   }
      htmlContent += '</div></div>'; // Ends projects
 }

   // document.getElementById("projContainer").innerHTML = htmlContent;}
