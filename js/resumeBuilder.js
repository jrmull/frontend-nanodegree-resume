/*global HTMLheaderName HTMLheaderRole HTMLcontactGeneric HTMLbioPic
         HTMLwelcomeMsg HTMLskillsStart HTMLskills HTMLworkStart
         HTMLworkEmployer HTMLworkTitle HTMLworkDates HTMLworkLocation
         HTMLworkDescription*/
/*eslint-disable no-alert, no-console */

var x = 0; //used to iterate over arrays

var loadBio = function(bioObj) {
  /* var declarations at the top of the function for performance and scope clarity
     var keyword important so the variable isn't defined in global scope
     https://jsperf.com/declaring-variables-inside-loops/27
     https://jslinterrors.com/move-var-declarations-to-the-top-of-the-function
  */
  var contacts = bioObj.bio.contacts,
    contactsKeys = Object.keys(contacts),
    skills = bioObj.bio.skills,
    skillsKeys = Object.keys(skills),
    formattedName = HTMLheaderName.replace('%data%', bioObj.bio.name),
    formattedRole = HTMLheaderRole.replace('%data%', bioObj.bio.role),
    formattedBioPic = HTMLbioPic.replace('%data%', bioObj.bio.biopic),
    formattedMsg = HTMLwelcomeMsg.replace('%data%', bioObj.bio.welcomeMessage),
    formattedContact = '',
    formattedSkill = '';

  bioObj.bio.display = function() {
    console.log('Display bioObj');

    //Name & Role
    $('#header')
      .css('display', 'block') //Vanilla JS equivalent: document.getElementById('header').style.display = 'block';
      .prepend(formattedName)
      .append(formattedRole);

    //Contact Info
    $('#topContacts')
      .css('display', 'flex');
    $('#footerContacts')
      .css('display', 'flex');

    /* Iterate over an array of the names of keys of the contacts object.
       This is better performing than a for-in loop and obviates the need
       to check hasOwnProperty() which is required to avoid unwanted properties
       higher up in the prototype chain when using for-in

       https://jsperf.com/fastest-array-loops-in-javascript/24
     */
    for (x = 0; x < contactsKeys.length; x += 1) {
      formattedContact = HTMLcontactGeneric.replace('%contact%',
          contactsKeys[x])
        .replace('%data%', contacts[contactsKeys[x]]);
      $('#topContacts,#footerContacts')
        .append(formattedContact);
    }

    //Biopic, Welcome Message, Skills
    $('#header')
      .append(formattedBioPic)
      .append(formattedMsg)
      .append(HTMLskillsStart);

    for (x = 0; x < skillsKeys.length; x += 1) {
      formattedSkill = HTMLskills.replace('%data%', skills[skillsKeys[x]]);
      $('#header')
        .append(formattedSkill);
    }
  }();
};

var loadWork = function(workObj) {
  var jobs = workObj.work.jobs,
    formattedEmployer = '',
    formattedTitle = '',
    formattedWorkDates = '',
    formattedWorkLocation = '',
    formattedWorkDescription = '';

  workObj.work.display = function() {
    console.log('Display workObj');

    //Work Experience
    $('#workExperience')
      .css('display', 'block')
      .prepend(HTMLworkStart);

    for (x = 0; x < jobs.length; x += 1) {
      formattedEmployer = HTMLworkEmployer.replace('%data%', jobs[x].employer);
      formattedTitle = HTMLworkTitle.replace('%data%', jobs[x].title);
      formattedWorkDates = HTMLworkDates.replace('%data%', jobs[x].dates);
      formattedWorkLocation = HTMLworkLocation.replace('%data%', jobs[x].location);
      formattedWorkDescription =
        HTMLworkDescription.replace('%data%', jobs[x].description);

      $('#workExperience')
        .append(formattedEmployer + formattedTitle)
        .append(formattedWorkDates)
        .append(formattedWorkLocation)
        .append(formattedWorkDescription);
    }
  }();
};

/*
var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';
*/

var loadProjects = function(projectsObj) {
  var projects = projectsObj.projects.projects,
    formattedProjectTitle = '',
    formattedProjectDates = '',
    formattedProjectDescription = '',
    formattedProjectImage = '';

  projectsObj.display = function() {
    console.log('Display projectsObj');

    $('#projects')
      .css('display', 'block')
      .prepend(HTMLprojectStart);

    for (x = 0; x < projects.length; x += 1) {
      formattedProjectTitle = HTMLprojectTitle.replace('%data%', projects[x]
        .title);
      formattedProjectDates = HTMLprojectDates.replace('%data%', projects[x]
        .dates);
      formattedProjectDescription = HTMLprojectDescription.replace('%data%',
        projects[
          x].description);
      formattedProjectImage =
        HTMLprojectImage.replace('%data%', projects[x].images);

      $('#projects')
        .append(formattedProjectTitle)
        .append(formattedProjectDates)
        .append(formattedProjectDescription)
        .append(formattedProjectImage);
    }
  }();
};

var logFailedRequest = function(jqxhr, textStatus, error) {
  var err = textStatus + ', ' + error;
  alert('Request Failed: ' + err);
};

var loadData = function() {
  //bio
  $.getJSON('/data/bio.json', function() {
      console.log('Read bio.json');
    })
    .fail(logFailedRequest)
    .done(loadBio);

  //work
  $.getJSON('/data/work.json', function() {
      console.log('Read work.json');
    })
    .fail(logFailedRequest)
    .done(loadWork);

  //projects
  $.getJSON('/data/projects.json', function() {
      console.log('Read projects.json');
    })
    .fail(logFailedRequest)
    .done(loadProjects);
};

$(loadData);
