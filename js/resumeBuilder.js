var logFailedRequest = function(jqxhr, textStatus, error) {
  var err = textStatus + ", " + error;
  console.log("Request Failed: " + err);
};

var loadBio = function(bioObj, textStatus, jqxhr) {
  document.getElementById('header').style.display = 'flex';
  var formattedName = HTMLheaderName.replace("%data%", bioObj.bio.name);
  $("#header").prepend(formattedName);
};

var loadData = function() {
  //bio
  $.getJSON("/data/bio.json", loadBio)
    .fail(logFailedRequest);
};

$(loadData);
