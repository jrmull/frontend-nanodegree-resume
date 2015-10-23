/*global HTMLheaderName HTMLheaderRole HTMLcontactGeneric HTMLbioPic
         HTMLwelcomeMsg HTMLskillsStart HTMLskills HTMLworkStart
         HTMLworkEmployer HTMLworkTitle HTMLworkDates HTMLworkLocation
         HTMLworkDescription HTMLprojectStart HTMLprojectTitle
         HTMLprojectDates HTMLprojectDescription HTMLprojectImage
         HTMLschoolStart HTMLschoolName HTMLschoolDegree HTMLschoolDates
         HTMLschoolLocation HTMLschoolMajor HTMLonlineClasses
         HTMLonlineTitle HTMLonlineSchool HTMLonlineDates HTMLonlineURL
         googleMap */
/*eslint-disable no-alert, no-console */

/* put objects read from /data into the global scope
   these vars referenced by locationFinder in helper.js
*/
/* exported jmullResume */
var jmullResume = jmullResume || {};

jmullResume.
loadBio = function(bioObj) {
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
    var x = 0;

    //Name & Role
    $('#header')
      .css('display', 'block') //Vanilla JS equivalent: document.getElementById('header').style.display = 'block';
      .prepend(formattedName)
      .append(formattedRole);

    //Contact Info
    $('#topContacts')
      .css('display', 'flex');
    $('#lets-connect')
      .css('display', 'block');

    /* Iterate over an array of the names of keys of the contacts object.
       This is better performing than a for-in loop and obviates the need
       to check hasOwnProperty() which is required to avoid unwanted properties
       higher up in the prototype chain when using for-in

       https://jsperf.com/fastest-array-loops-in-javascript/24
     */
    for (x = 0; x < contactsKeys.length; x += 1) {
      formattedContact = HTMLcontactGeneric.replace('%contact%', contactsKeys[x])
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

  jmullResume.bio = bioObj.bio;
};

jmullResume.loadWork = function(workObj) {
  var jobs = workObj.work.jobs,
    formattedEmployer = '',
    formattedTitle = '',
    formattedWorkDates = '',
    formattedWorkLocation = '',
    formattedWorkDescription = '';

  workObj.work.display = function() {
    console.log('Display workObj');
    var x = 0;

    //Work Experience
    $('#workExperience')
      .css('display', 'block')
      .append(HTMLworkStart);

    for (x = 0; x < jobs.length; x += 1) {
      formattedEmployer = HTMLworkEmployer.replace('%data%', jobs[x].employer);
      formattedTitle = HTMLworkTitle.replace('%data%', jobs[x].title);
      formattedWorkDates = HTMLworkDates.replace('%data%', jobs[x].dates);
      formattedWorkLocation = HTMLworkLocation.replace('%data%', jobs[x].location);
      formattedWorkDescription = HTMLworkDescription.replace('%data%', jobs[x].description);

      $('.work-entry:last')
        .append(formattedEmployer + formattedTitle)
        .append(formattedWorkDates)
        .append(formattedWorkLocation)
        .append(formattedWorkDescription);
    }
  }();

  jmullResume.work = workObj.work;
};

jmullResume.loadProjects = function(projectsObj) {
  var projects = projectsObj.projects.projects,
    formattedProjectTitle = '',
    formattedProjectDates = '',
    formattedProjectDescription = '',
    formattedProjectImage = '';

  projectsObj.projects.display = function() {
    console.log('Display projectsObj');
    var x = 0;

    $('#projects')
      .css('display', 'block')
      .append(HTMLprojectStart);

    for (x = 0; x < projects.length; x += 1) {
      formattedProjectTitle = HTMLprojectTitle.replace('%data%', projects[x].title);
      formattedProjectDates = HTMLprojectDates.replace('%data%', projects[x].dates);
      formattedProjectDescription = HTMLprojectDescription.replace('%data%', projects[x].description);
      formattedProjectImage = HTMLprojectImage.replace('%data%', projects[x].images);

      $('.project-entry')
        .append(formattedProjectTitle)
        .append(formattedProjectDates)
        .append(formattedProjectDescription)
        .append(formattedProjectImage);
    }
  }();
};

jmullResume.loadEducation = function(educationObj) {
  var schools = educationObj.education.schools,
    onlineCourses = educationObj.education.onlineCourses,
    formattedSchoolName = '',
    formattedSchoolDegree = '',
    formattedSchoolDates = '',
    formattedSchoolLocation = '',
    formattedSchoolMajor = '',
    formattedOnlineTitle = '',
    formattedOnlineSchool = '',
    formattedOnlineDates = '',
    formattedOnlineURL = '';

  educationObj.education.display = function() {
    console.log('Display educationObj');
    var x = 0,
      y = 0;

    $('#education')
      .css('display', 'block')
      .append(HTMLschoolStart);

    for (x = 0; x < schools.length; x += 1) {
      formattedSchoolName = HTMLschoolName.replace('%data%', schools[x].name);
      formattedSchoolDegree = HTMLschoolDegree.replace('%data%', schools[x].degree);
      formattedSchoolDates = HTMLschoolDates.replace('%data%', schools[x].dates);
      formattedSchoolLocation = HTMLschoolLocation.replace('%data%', schools[x].location);

      $('.education-entry')
        .append(formattedSchoolName)
        .append(formattedSchoolDegree)
        .append(formattedSchoolDates)
        .append(formattedSchoolLocation);

      for (y = 0; y < schools[x].majors.length; y += 1) {
        formattedSchoolMajor = HTMLschoolMajor.replace('%data%', schools[x].majors[y]);
        $('.education-entry')
          .append(formattedSchoolMajor);
      }
    }

    $('.education-entry')
      .append(HTMLonlineClasses);
    for (x = 0; x < onlineCourses.length; x += 1) {
      formattedOnlineTitle = HTMLonlineTitle.replace('%data%', onlineCourses[x].title);
      formattedOnlineSchool = HTMLonlineSchool.replace('%data%', onlineCourses[x].school);
      formattedOnlineDates = HTMLonlineDates.replace('%data%', onlineCourses[x].date);
      formattedOnlineURL = HTMLonlineURL.replace('%data%', onlineCourses[x].url);

      $('.education-entry')
        .append(formattedOnlineTitle)
        .append(formattedOnlineSchool)
        .append(formattedOnlineDates)
        .append(formattedOnlineURL);
    }

    jmullResume.education = educationObj.education;
  }();
};

jmullResume.logFailedRequest = function(jqxhr, textStatus, error) {
  var err = textStatus + ', ' + error;
  alert('Request Failed: ' + err);
};

jmullResume.buildResume = function() {
  //bio
  $.getJSON('data/bio.json', function() {
      console.log('Read bio.json');
    })
    .fail(jmullResume.logFailedRequest)
    .done(jmullResume.loadBio);

  //work
  $.getJSON('data/work.json', function() {
      console.log('Read work.json');
    })
    .fail(jmullResume.logFailedRequest)
    .done(jmullResume.loadWork);

  //projects
  $.getJSON('data/projects.json', function() {
      console.log('Read projects.json');
    })
    .fail(jmullResume.logFailedRequest)
    .done(jmullResume.loadProjects);

  //education
  $.getJSON('data/education.json', function() {
      console.log('Read education.json');
    })
    .fail(jmullResume.logFailedRequest)
    .done(jmullResume.loadEducation);

  //map
  $('#mapDiv')
    .css('display', 'block')
    .append(googleMap);
};

$(jmullResume.buildResume);
