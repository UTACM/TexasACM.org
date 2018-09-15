var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbwohUlrXGu82rtev0g0U5kcTFGnyRfgYLtKlgeVuOz5Wdq6jmql/exec'

$('#submit-form').on('click', function(e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  }).success(
    // do something
    alert("it ran!");
  );
})
