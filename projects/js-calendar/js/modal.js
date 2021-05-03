//------------------------------------------------------------------------
// GLOBAL VARIABLES
//------------------------------------------------------------------------
let r = document.querySelector(':root');
let dateEventUTC;
let i = 0;
let newEventObj = {};
let testEventIndex = i;
let eventToDisplay
let eventIndex;
let eventInfoArray = JSON.parse(localStorage.getItem("localEventInfo"));



//------------------------------------------------------------------------
// HTML ELEMENTS
//------------------------------------------------------------------------
let titleNewEvent = document.getElementById('titleNewEvent');
let typeNewEvent = document.getElementById('typeNewEvent');
let startNewEvent = document.getElementById('startNewEvent');
let endNewEvent = document.getElementById('endNewEvent');
let timeReminderNewEvent = document.getElementById('timeReminderNewEvent');
let descriptionNewEvent = document.getElementById('descriptionNewEvent');

let titleEvent = document.getElementById('titleEvent');
let typeEvent = document.getElementById('typeEvent');
let startDateEvent = document.getElementById('startDateEvent');
let endDateEvent = document.getElementById('endDateEvent');
let reminderEvent = document.getElementById('reminderEvent');
let descriptionEvent = document.getElementById('descriptionEvent');

let eventEndDateLabel = document.getElementById('eventEndDateLabel');
let eventReminderLabel = document.getElementById('eventReminderLabel');
let eventDescriptionLabel = document.querySelector(".eventDescriptionLabel");
let eventDescriptionLabelId = document.getElementById('eventDescriptionLabelId');


let modalNewEvent = document.getElementById("newEventModal");
let modalCheckEvent = document.getElementById("checkEventModal");

// Get the button that opens the modal
let btnNewEvent = document.getElementById("newEventBtn");
let btnCheckEvent = document.getElementById("checkEventBtn");
// Mobile add event button
let newEventMobile = document.getElementById("newEventBtnMobile");

// Get the <span> element that closes the modal
let closeModal = document.getElementsByClassName("close");

let cancelNewEvent = document.getElementById("cancelNewEvent");
let removeEvent = document.getElementById("RemoveEventButton");
let okEvent = document.getElementById("okCheckEventButton");

// Get checkboxes and optional elements
let eventLabel = document.querySelectorAll(".eventLabel")

let endCheckbox = document.getElementById("checkBoxEndDate");
let endDateLabel = document.getElementById("endDateLabel");
let endCheckboxSpan = document.querySelector(".endCheckbox");

let reminderCheckbox = document.getElementById("reminderNewEvent");
let showReminder = document.getElementById("reminderNewEventDiv");
let reminderLabel = document.getElementById("reminderLabel");
let reminderCheckboxSpan = document.querySelector(".reminderCheckbox");

let descriptionCheckbox = document.getElementById("descriptionCheckbox");
let descriptionLabel = document.getElementById("descriptionLabel");
let descriptionCheckboxSpan = document.querySelector(".descriptionCheckbox");

// Get save button to submit event and save it to calendar and localStorage
let saveEventButton = document.getElementById("saveNewEvent");

// Get form and type
let newEventForm = document.getElementById("newEventForm");
let eventDescription = document.getElementById("descriptionNewEvent");
let checkboxNewEvent = document.querySelectorAll(".checkboxInput")



//------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------
// Set local storage index
if (eventInfoArray == null){
  eventIndex = 0;
  eventInfoArray = [];
}else{
  eventInfoArray = JSON.parse(localStorage.getItem("localEventInfo"));
  eventIndex = eventInfoArray.length;
}
localStorage.setItem("eventIndex", eventIndex );



//------------------------------------------------------------------------
// EVENT LISTENERS
//------------------------------------------------------------------------
// When the user clicks the button, open the modal
btnNewEvent.onclick = function () {
  modalNewEvent.style.display = "flex";
  // disable arrow keyboard event for the calendar when modal is opened. 
  document.removeEventListener("keydown", handleArrowKeys);
};

btnCheckEvent.onclick = function () {
  modalCheckEvent.style.display = "flex";
   // disable arrow keyboard event for the calendar when modal is opened. 
  document.removeEventListener("keydown", handleArrowKeys);
};

// Mobile add event button
newEventMobile.onclick = function () {
  modalNewEvent.style.display = "flex";
};

// When the user clicks on <span> (x), close the modal
closeModal[0].onclick = function () {
  modalNewEvent.style.display = "none";
  // Enabling arrow navigation back
  document.addEventListener('keydown', handleArrowKeys);
  clearNewEventForm();
};

closeModal[1].onclick = function () {
  modalCheckEvent.style.display = "none";
  // Enabling arrow navigation back
  document.addEventListener('keydown', handleArrowKeys);
};

// When the user clicks on cancel, close the modal
cancelNewEvent.onclick = function () {
  modalNewEvent.style.display = "none";
  // Enabling arrow navigation back
  document.addEventListener('keydown', handleArrowKeys);
  clearNewEventForm();
};

// When the user clicks on OK, close the modal
okEvent.onclick = function () {
  modalCheckEvent.style.display = "none";
  // Enabling arrow navigation back
  document.addEventListener('keydown', handleArrowKeys);
};

//When the user click on remove event
removeEvent.addEventListener('click', removingEvent);

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalCheckEvent || event.target == modalNewEvent) {
    modalNewEvent.style.display = "none";
    modalCheckEvent.style.display = "none";
    clearNewEventForm();
    // Enabling arrow navigation back
    document.addEventListener('keydown', handleArrowKeys);
  }
};

// Closing modals when escape key is down
document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode == 27) {
    modalNewEvent.style.display = "none";
    modalCheckEvent.style.display = "none";
    clearNewEventForm();
    // Enabling arrow navigation back
    document.addEventListener('keydown', handleArrowKeys);
  }
};

// Displays end date checkbox
endCheckbox.onclick = function () {
  if (endCheckbox.checked == true) {
    endNewEvent.style.display = "inline-block";
    endDateLabel.style.color = "var(--blackColor)";
    endDateLabel.style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";
    endCheckboxSpan.style.backgroundColor = "var(--darkColor)";
    endCheckboxSpan.style.border = "var(--darkColor) solid var(--borderWidth)";
    } else {
    endNewEvent.style.display = "none";
    endDateLabel.style.color = "var(--greyColor)";
    endDateLabel.style.borderBottom  = "var(--greyColor) solid var(--borderWidth)";
    endCheckboxSpan.style.backgroundColor = "white";
    endCheckboxSpan.style.border = "var(--greyColor) solid var(--borderWidth)";
    endNewEvent.value = "";
    }
};

// Displays reminder checkbox
reminderCheckbox.onclick = function () {
  if (reminderCheckbox.checked == true) {
    showReminder.style.display = "flex";
    reminderLabel.style.color = "var(--blackColor)";
    reminderLabel.style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";
    reminderCheckboxSpan.style.backgroundColor = "var(--darkColor)";
    reminderCheckboxSpan.style.border = "var(--darkColor) solid var(--borderWidth)";
  } else {
    showReminder.style.display = "none";
    reminderLabel.style.color = "var(--greyColor)";
    reminderLabel.style.borderBottom  = "var(--greyColor) solid var(--borderWidth)";
    reminderCheckboxSpan.style.backgroundColor = "white";
    reminderCheckboxSpan.style.border = "var(--greyColor) solid var(--borderWidth)";
    timeReminderNewEvent.value = "";
  }
};

// Displays description checkbox
descriptionCheckbox.onclick = function() {
  if (descriptionCheckbox.checked == true) {
    descriptionNewEvent.style.display = "inline-block";
    descriptionLabel.style.color = "var(--blackColor)";
    descriptionLabel.style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";
    descriptionCheckboxSpan.style.backgroundColor = "var(--darkColor)";
    descriptionCheckboxSpan.style.border = "var(--darkColor) solid var(--borderWidth)";
  } else {
    descriptionNewEvent.style.display = "none";
    descriptionLabel.style.color = "var(--greyColor)";
    descriptionLabel.style.borderBottom  = "var(--greyColor) solid var(--borderWidth)";
    descriptionCheckboxSpan.style.backgroundColor = "white";
    descriptionCheckboxSpan.style.border = "var(--greyColor) solid var(--borderWidth)";
    descriptionNewEvent.value = "";
  }
}

// Check validity
function newEventValidation () {

  var titleCheck = /^.{1,60}$/; // we need to discuss 
  var title = titleNewEvent.value;

  if (title.search(titleCheck) === -1) {
    titleNewEvent.style.background = "rgb(210, 43, 65, 0.4)"
    return false;
  }

  if (typeNewEvent.value === "none") {
   typeNewEvent.style.color = "var(--redColor)"
    return false;
  }

  if(!startNewEvent.value) {
    eventLabel[0].style.color = "var(--redColor)"
    eventLabel[0].style.borderBottom  = "var(--redColor) solid var(--borderWidth)";
    startNewEvent.style.color = "var(--redColor)";
    return false;
  }

  // End date checked
  if (endCheckbox.checked) {
    endNewEvent.required = true;

    // Accessing the milliseconds
    let startDateMilliseconds =  new Date(startNewEvent.value).getTime();
    let endDateMilliseconds =  new Date(endNewEvent.value).getTime();

    if (!endNewEvent.value) {
      endDateLabel.style.color = "var(--redColor)";
      endDateLabel.style.borderBottom  = "var(--redColor) solid var(--borderWidth)";
      endCheckboxSpan.style.backgroundColor = "var(--redColor)";
      endCheckboxSpan.style.border = "var(--redColor) solid var(--borderWidth)";

      if (window.innerWidth < 768) {
        checkboxNewEvent[0].style.backgroundSize = "10px 10px";
      };

      return false;

    };

    // If the user sets an end dat before start date
    if (startDateMilliseconds > endDateMilliseconds){
      endDateLabel.style.color = "var(--redColor)";
      endDateLabel.style.borderBottom  = "var(--redColor) solid var(--borderWidth)";
      endCheckboxSpan.style.backgroundColor = "var(--redColor)";
      endCheckboxSpan.style.border = "var(--redColor) solid var(--borderWidth)";
      endNewEvent.style.color = "var(--redColor)";

      if (window.innerWidth < 768) {
        checkboxNewEvent[0].style.backgroundSize = "10px 10px";
      };

      return false;

    };

  };

  // Reminder checked
  if (reminderCheckbox.checked) {
    timeReminderNewEvent.required = true;
    if (timeReminderNewEvent.value === "") {
      reminderLabel.style.color = "var(--redColor)";
      reminderLabel.style.borderBottom  = "var(--redColor) solid var(--borderWidth)";
      reminderCheckboxSpan.style.backgroundColor = "var(--redColor)";
      reminderCheckboxSpan.style.border = "var(--redColor) solid var(--borderWidth)";
      timeReminderNewEvent.style.color = "var(--redColor)";

      if (window.innerWidth < 768) {
        checkboxNewEvent[1].style.backgroundSize = "10px 10px";
      };

      return false;

    };

  };

  // Description checked
  if(descriptionCheckbox.checked) {
    // descriptionNewEvent.required = true;
    if(descriptionNewEvent.value == "") {
      descriptionLabel.style.color = "var(--redColor)";
      descriptionLabel.style.borderBottom  = "var(--redColor) solid var(--borderWidth)";
      descriptionCheckboxSpan.style.backgroundColor = "var(--redColor)";
      descriptionCheckboxSpan.style.border = "var(--redColor) solid var(--borderWidth)";

      return false;

    };

  };

  return true;

};

// If user enters new event title more than 10 characters, gradient style is apply to the left of input box dynamically. 
titleNewEvent.oninput = (e) => {
  if(e.target.value.length <= 10){
    titleNewEvent.style.webkitMaskImage = null;
  } else {
    titleNewEvent.style.webkitMaskImage = "linear-gradient(to left, black 60%, transparent 100%)";
  }
}

// Function to save a new event
saveEventButton.addEventListener('click', function(){

  if(newEventValidation()){
    setNewEvent();
    if (newEventObj.reminder != "") {
      setNewReminder(newEventObj.id, newEventObj.reminder);
      setAllReminders();
    };

    clearNewEventForm();
    modalNewEvent.style.display = "none";

  };

  // Enabling arrow navigation back
  document.addEventListener('keydown', handleArrowKeys);

});

// Function for setting new event information to local storage
function setNewEvent(){
  dateStartEventUTC = new Date(startNewEvent.value);

  newEventObj = {
    id: eventIndex,
    title: titleNewEvent.value,
    type: parseInt(typeNewEvent.value),
    startDate: {
      milliseconds : dateStartEventUTC.getTime(),
      minutes : dateStartEventUTC.getUTCMinutes(),
      hour :  dateStartEventUTC.getUTCHours()+2,
      day : dateStartEventUTC.getUTCDate(),
      month : dateStartEventUTC.getUTCMonth()+1,
      year : dateStartEventUTC.getUTCFullYear(),
    },
    endDate: {
      milliseconds : "",
      minutes : "",
      hour :  "",
      day : "",
      month : "",
      year : "",
    },
    reminder: timeReminderNewEvent.value,
    description: descriptionNewEvent.value,
  };
  if(endNewEvent.value == "") {
    //Setting one hour after as end date as default
    newEventObj.endDate.milliseconds = dateStartEventUTC.getTime()+3600000;
    newEventObj.endDate.minutes = dateStartEventUTC.getUTCMinutes();
    newEventObj.endDate.hour = dateStartEventUTC.getUTCHours()+3;
    newEventObj.endDate.day = dateStartEventUTC.getUTCDate();
    newEventObj.endDate.month = dateStartEventUTC.getUTCMonth()+1;
    newEventObj.endDate.year = dateStartEventUTC.getUTCFullYear();
  }else{
    dateEndEventUTC = new Date(endNewEvent.value);
    newEventObj.endDate.milliseconds = dateEndEventUTC.getTime();
    newEventObj.endDate.minutes = dateEndEventUTC.getUTCMinutes();
    newEventObj.endDate.hour = dateEndEventUTC.getUTCHours()+2;
    newEventObj.endDate.day = dateEndEventUTC.getUTCDate();
    newEventObj.endDate.month = dateEndEventUTC.getUTCMonth()+1;
    newEventObj.endDate.year = dateEndEventUTC.getUTCFullYear();
  }
  eventInfoArray = JSON.parse(localStorage.getItem("localEventInfo"));
  if (eventInfoArray == null) {
    eventInfoArray = [];
  }

  eventInfoArray.push(newEventObj);

  if ( newEventObj.startDate.month !== newEventObj.endDate.month && newEventObj.endDate.month !== null ){

    let startDayMonthLength = calculateMonthLength(newEventObj.startDate.year, newEventObj.startDate.month);
    let millisecondsDiff = newEventObj.endDate.milliseconds - newEventObj.startDate.milliseconds;
    let dayDiff = Math.ceil(millisecondsDiff / (1000 * 60 * 60 * 24));
    let daysToEndMonth = startDayMonthLength - newEventObj.startDate.day;
    console.log("Month length", startDayMonthLength, ". Days to end:", daysToEndMonth);
    let daysFromStartMonth = dayDiff - daysToEndMonth;
    console.log("Day diff", dayDiff);
    // Events that go through months
    // Adding an extra event id for
    var nextMonthDays = {
      id: newEventObj.id,
      title: newEventObj.title,
      type: newEventObj.type,
      startDate: {
          day: 1,
          // Solve this when there's an event on december
          minutes: newEventObj.startDate.minutes,
          hour: newEventObj.startDate.hour,
          month: newEventObj.startDate.month + 1,
          year: newEventObj.startDate.year
      },
      endDate: {
          day: daysFromStartMonth,
          // Solve this when there's an event on december
          minutes: newEventObj.endDate.minutes,
          hour: newEventObj.endDate.hour,
          month: newEventObj.startDate.month + 1,
          year: newEventObj.startDate.year
      },
      reminder: newEventObj.reminder,
      description: newEventObj.description
    };
    // Pushing the new month event
    eventInfoArray.push(nextMonthDays);

  }

  //Stringiying our object generated by event form
  localStorage.setItem("localEventInfo", JSON.stringify(eventInfoArray));
  //Updating eventIndex
  localStorage.setItem("eventIndex", JSON.parse(localStorage.getItem("localEventInfo")).length);
  eventIndex = JSON.parse(localStorage.getItem("localEventInfo")).length;
};

//Function for getting event from local storage for visualization
function getEvent(){
  // Resetting display optional info
  endDateEvent.innerHTML = "";
  reminderEvent.innerHTML = "";

  idEvent = this.id;
  idEvent = idEvent.match(/\d/g);
  idEvent = idEvent.join("");

  eventListComparing = JSON.parse(localStorage.getItem("localEventInfo"));
  eventListComparing.forEach(function(eventComparing){
    if (eventComparing.id == idEvent){

      eventToDisplay = eventComparing;

    };

  });

    titleEvent.innerHTML = eventToDisplay.title;

    //Depending of type event, the colour of the event is differente
    switch (parseInt(eventToDisplay.type)) {
      case 0:
        r.style.setProperty('--eventColor', 'rgb(0, 213, 194)');
        typeEvent.innerHTML = "Work";
        break;
      case 1:
        r.style.setProperty('--eventColor', 'rgb(220, 0, 235)');
        typeEvent.innerHTML = "Sport";
        break;
      case 2:
        r.style.setProperty('--eventColor', 'rgb(255, 183, 0)');
        typeEvent.innerHTML = "Music";
        break;
      case 3:
        r.style.setProperty('--eventColor', 'rgb(0, 89, 194)');
        typeEvent.innerHTML = "Other";
        break;
      default:
        r.style.setProperty('--eventColor', 'black');
        break;
    }

    // Set scroll animation for long titles
    if(eventToDisplay.title.length > 10) {
      document.getElementById("titleEventContainer").setAttribute("class", "eventTitleFlow");
    } else {
      document.getElementById("titleEventContainer").removeAttribute("class", "eventTitleFlow");
    }

    if (eventToDisplay.startDate.minutes < 10) {
      eventToDisplay.startDate.minutes = "0" + eventToDisplay.startDate.minutes;
    }
    if (eventToDisplay.startDate.day < 10) {
      eventToDisplay.startDate.day = "0" + eventToDisplay.startDate.day;
    }
    if (eventToDisplay.startDate.month < 10) {
      eventToDisplay.startDate.month = "0" + eventToDisplay.startDate.month;
    }
    startDateEvent.innerHTML = eventToDisplay.startDate.day + "/" + eventToDisplay.startDate.month + "/" + eventToDisplay.startDate.year + " " + eventToDisplay.startDate.hour + ":" + eventToDisplay.startDate.minutes;

    if (eventToDisplay.endDate.year == null) {
      eventEndDateLabel.style.display = "none";
    } else{
      if (eventToDisplay.endDate.minutes < 10) {
        eventToDisplay.endDate.minutes = "0" + eventToDisplay.endDate.minutes;
      }
      if (eventToDisplay.endDate.day < 10) {
        eventToDisplay.endDate.day = "0" + eventToDisplay.endDate.day;
      }
      if (eventToDisplay.endDate.month < 10) {
        eventToDisplay.endDate.month = "0" + eventToDisplay.endDate.month;
      }
      eventEndDateLabel.style.display = "inline-block";
      endDateEvent.innerHTML = eventToDisplay.endDate.day + "/" + eventToDisplay.endDate.month + "/" + eventToDisplay.endDate.year + " " + eventToDisplay.endDate.hour + ":" + eventToDisplay.endDate.minutes;
    }

    if (eventToDisplay.reminder == "") {
      eventReminderLabel.style.display = "none";
    }
      else{
      eventReminderLabel.style.display = "inline-block";
      reminderEvent.innerHTML = eventToDisplay.reminder + " min";
    };

    if (eventToDisplay.description == "") {
      eventDescriptionLabelId.style.display = "none";
      descriptionEvent.style.display = "none"
    } 
    else{
      eventDescriptionLabelId.style.display = "inline-block";
      descriptionEvent.style.display = "inline-block"
      descriptionEvent.innerHTML = eventToDisplay.description;
    }

    modalCheckEvent.style.display = "flex";

    // Remove arrow navigation
    document.removeEventListener("keydown", handleArrowKeys);

};

// Removing events
function removingEvent(){

  eventListToRemove = JSON.parse(localStorage.getItem("localEventInfo"));
  reminderListToRemove = JSON.parse(localStorage.getItem("localReminderInfo"));

  let divsDeletedEvent = document.getElementsByClassName("eventId"+eventToDisplay.id);

  // Remove empty div
  for ( let div of divsDeletedEvent){
    console.log(div.parentNode.remove());
  }

  // Running into the array looking for the reminder to remove
  for (let i = 0; i < eventListToRemove.length; i++) {
    if (eventListToRemove[i].id == eventToDisplay.id) {
      if (reminderListToRemove !== null){
        for (let j = 0; j < reminderListToRemove.length; j++) {
          console.log(reminderListToRemove[j])
          if (reminderListToRemove[j].eventId == i) {
            reminderListToRemove.splice(j, 1);
          };
        };
      };
    };
  };

  // Make a new array removing events with the current ID
  var filteredEvents = eventListToRemove.filter(function(obj, index, arr){ 
    return obj.id !== eventToDisplay.id;
  });

  // Reseting localStorage
  localStorage.setItem("localReminderInfo", JSON.stringify(reminderListToRemove));
  localStorage.setItem("localEventInfo", JSON.stringify(filteredEvents));
  modalCheckEvent.style.display = "none";

  // Deleting title containers (wrapper) for long names
  let titles = document.getElementsByClassName("titleContainerId"+eventToDisplay.id);
  // console.log(titles);
  for (let t of titles){
    t.remove();
  };

  setDailyEvents();

};

// Clear event form
function clearNewEventForm(){
  newEventForm.reset();

  //Setting back all colors
  titleNewEvent.style.background = "white";
  typeNewEvent.style.color = "var(--darkColor)";
  eventLabel[0].style.color = "var(--darkColor)";
  eventLabel[0].style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";

  endDateLabel.style.color = "var(--greyColor)";
  endDateLabel.style.borderBottom  = "var(--greyColor) solid var(--borderWidth)";
  endCheckboxSpan.style.backgroundColor = "white";
  endCheckboxSpan.style.border = "var(--greyColor) solid var(--borderWidth)";
  endNewEvent.style.display = "none";

  reminderLabel.style.color = "var(--greyColor)";
  reminderLabel.style.borderBottom  = "var(--greyColor) solid var(--borderWidth)";
  reminderCheckboxSpan.style.backgroundColor = "white";
  reminderCheckboxSpan.style.border = "var(--greyColor) solid var(--borderWidth)";
  showReminder.style.display = "none";


  descriptionLabel.style.color = "var(--greyColor)";
  eventLabel[3].style.borderBottom  = "var(--greyColor) solid var(--borderWidth)";
  descriptionCheckboxSpan.style.backgroundColor = "white";
  descriptionCheckboxSpan.style.border = "var(--greyColor) solid var(--borderWidth)";
  descriptionNewEvent.style.display = "none";

};
