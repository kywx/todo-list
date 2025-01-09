// global variables
var currentTask;    // element for save/delete task to work

function displayTaskObject(key, taskValue) {
    // the "ul" object
    const taskList = document.getElementById("tasks");
    // create a "li" object
    const taskObject = document.createElement("li");
    taskList.appendChild(taskObject);
    taskObject.onclick = function() {collapsible(this)};
    taskObject.setAttribute("id", key);
    // the "li" children
    const taskIcon = document.createElement("span");    // task icon
    taskIcon.setAttribute("class", "task-icon");
    taskIcon.onclick = function() {changeStatus(this, key)};     // click = change status
    var icon = document.createElement("i");     // the icon
    icon.setAttribute("class", "fa fa-square-o");
    taskIcon.appendChild(icon);
    taskObject.appendChild(taskIcon);
    const taskTitle = document.createElement("span");   // the title
    taskTitle.setAttribute("class", "task-title");
    taskTitle.textContent = "  " + taskValue.title;
    taskObject.appendChild(taskTitle);
    const taskEdit = document.createElement("button");      // the edit button
    taskEdit.setAttribute("class", "task-edit");
    taskEdit.onclick = function() {editTask(this)};     // click = can edit this task
    taskEdit.setAttribute("data-bs-toggle", "modal");       // connect to modal
    taskEdit.setAttribute("data-bs-target", "#editModal");      // connect to edit modal
    var editIcon = document.createElement("i");     // edit icon
    editIcon.setAttribute("class", "fa fa-pencil");
    editIcon.style.fontSize = "36px";
    taskEdit.appendChild(editIcon);
    taskObject.appendChild(taskEdit);
    const taskStatus = document.createElement("span");      // the status text
    taskStatus.setAttribute("class", "task-status");
    taskStatus.textContent = taskValue.progress;     // default status text value
    if(taskValue.progress.includes("Not Started")){
        icon.setAttribute("class", "fa fa-square-o");
        taskStatus.style.color = "rgb(217, 8, 8)";
    }
    else if(taskValue.progress.includes("In Progress")) {
        icon.setAttribute("class", "fa fa-clock-o");
        taskStatus.style.color =  "rgb(209, 167, 27)";
    }
    else if(taskValue.progress.includes("Completed")){
        icon.setAttribute("class", "fa fa-check-square-o");
        taskStatus.style.color =  "green";
    }

    taskObject.appendChild(taskStatus);

    // the "div" content object
    const contentObject = document.createElement("div");
    contentObject.setAttribute("class", "task-content");
    var insideDiv = document.createElement("div");
    // task priority
    var taskPriority = document.createElement("span");  // the priority
    taskPriority.setAttribute("class", "task-priority");
    var priorityIcon = document.createElement("i");     // priority icon
    priorityIcon.style.fontSize = "24px";
    priorityIcon.setAttribute("class", "fa fa-exclamation-triangle");
    // color and text of priority stuff based on selection
    if (taskValue.priority == "High") {
        // high
        priorityIcon.style.color = "rgb(220, 12, 12)";
        taskPriority.textContent = " High ";
    } else if (taskValue.priority == "Medium") {
        // medium
        priorityIcon.style.color = "rgb(232, 155, 100)";
        taskPriority.textContent = " Medium ";
    } else {
        // low
        priorityIcon.style.color = "rgb(212, 195, 45)";
        taskPriority.textContent = " Low ";
    }
    insideDiv.appendChild(priorityIcon);
    insideDiv.appendChild(taskPriority);
    // add tags
    var tagList = document.createElement("ul");
    tagList.setAttribute("class", "task-tags");

    // iterate through tags and append them to tagList
    var tagsContent = taskValue.tags;
    var tagsContentList = tagsContent.split("X");
    for(let i = 0; i < tagsContentList.length-1; i++){
        var e = document.createElement("li");
        e.textContent = tagsContentList[i];
        tagList.appendChild(e);
    }

    insideDiv.appendChild(tagList);
    contentObject.appendChild(insideDiv);
    // task description
    const taskDescription = document.createElement("div");
    taskDescription.setAttribute("class", "task-description");
    var e = document.createElement("p");
    e.textContent = taskValue.description;
    taskDescription.appendChild(e);
    contentObject.appendChild(taskDescription);
    // task deadline
    const taskDeadline = document.createElement("div");
    taskDeadline.setAttribute("class", "task-deadline");
    e = document.createElement("span");
    var deadline = taskValue.deadline;
    e.textContent = "" + deadline.slice(0,10) + " " + deadline.slice(11, 16);
    var _deadline = document.createElement("span");
    _deadline.style.display = "none";
    _deadline.textContent = deadline;
    taskDeadline.appendChild(e);
    taskDeadline.appendChild(_deadline);
    contentObject.appendChild(taskDeadline);
    // add div to the "ul"
    taskList.appendChild(contentObject);
}
// initialize local storage
if(localStorage.length == 2) {
    var taskValue = {"title": "Task 1", "description": "Descriptionj", "tags": "AssignmentXWorkX", "priority": "Medium", "deadline": "12/03/2024 11:59pm", "progress": " In Progress "};
    localStorage.setItem(0, JSON.stringify(taskValue));

    taskValue = {"title": "Task 3", "description": "Descriptionj", "tags": "AssignmentXWorkX", "priority": "Low", "deadline": "12/03/2024", "progress": " Not Started "};
    localStorage.setItem(1, JSON.stringify(taskValue));

    taskValue = {"title": "Task 2", "description": "Descriptionj", "tags": "AssignmentXWorkX", "priority": "High", "deadline": "12/03/2024", "progress": " Completed "};
    localStorage.setItem(2, JSON.stringify(taskValue));
}
// display task objects
var taskValue = "";
for(var i = 0; i < localStorage.length; i++){
    var key = localStorage.key(i);
    taskValue = localStorage.getItem(key);
    if(taskValue.includes("title")) {
        taskValue = JSON.parse(taskValue);
        displayTaskObject(key, taskValue);
    }
    else{
        continue;
    }
        
}


// for getWeather function
var cityID = '5359777';
var city = 'Irvine';
var APIkey = '523709edb28b2953ba8003379093e8aa';
var url = `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${APIkey}&units=${"imperial"}`;


// dropdown elements
var myDropdown = document.getElementById("dropdown-content");
var tagDropdown = document.getElementById("dropdown-tags-content");
var editDropdown = document.getElementById("edit-dropdown-tags-content");

// when click dropdown menu, close dropdown menu
window.onclick = function(e) {
    if (!e.target.matches(".filter-dropdown")) {
        if (myDropdown.classList.contains("show")) {
            myDropdown.classList.remove("show");
        }
    }
    if (!e.target.matches(".tags-dropdown")) {
        if (tagDropdown.classList.contains("show")) {
            tagDropdown.classList.remove("show");
        }
        if (editDropdown.classList.contains("show")) {
            editDropdown.classList.remove("show");
        }
    }
}

// Filter Dropdown Menu
function dropdownFilter() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

// Create Task dropdown menus
function dropdownTags() {
    document.getElementById("dropdown-tags-content").classList.toggle("show");
}

// Edit Task dropdown menus
function editDropdownTags() {
    document.getElementById("edit-dropdown-tags-content").classList.toggle("show");
}


function dropdownPriority() {
    document.getElementById("dropdown-priority-content").classList.toggle("show");
}


// Filter tag creation/removal

function createTag(element, listID) {
    const tags = document.getElementById(listID);
    // if content is not already in Tags!!
    if (!tags.textContent.includes(element.innerText)) {
        const tag = document.createElement('li');
        const tagContent = element.innerText;
        tag.innerText = tagContent;
        var button = document.createElement("button");
        button.setAttribute("class", "delete-button");
        button.onclick = function() {deleteTag(this, element)};
        button.innerText = "X";
        tag.appendChild(button);
        tags.appendChild(tag);
        // turn the dropdown content grey
        element.style.backgroundColor = '#bababa';
    }
    // if its the filter dropdown, do filtering
    if (listID == "tags") {
        // go through the list of visible tasks
        // if it doesn't have the new tag, hide

        // var listOfTasks = document.getElementById("tasks").querySelectorAll("li");
        // for (let i=0; i<listOfTasks.length; i++) {
        //     // if visible
        //     // if doesn't have tag
        //     // hide
        //     var taskContentTags = listOfTasks[i].nextElementSibling.querySelectorAll("li");
        // }

        var listOfTasks = document.getElementById("tasks").children;
        for (let i=0; i<listOfTasks.length;i=i+2) {
            if (listOfTasks[i].style.display == "none") {
                // invisible, so skip this task
                continue;
            }
            var listTags = listOfTasks[i+1].querySelectorAll("li");
            var contain = 0;

            for (let j=0; j<listTags.length; j++) {
                if (listTags[j].textContent.trim() == element.textContent.trim()) {
                    // same tag
                    contain = 1;
                    break;
                }
            }
            if (contain == 0) {
                // does not contain this tag, so hide it
                listOfTasks[i].style.display = "none";
                listOfTasks[i+1].style.display = "none";
            }
        }
    }
}

function deleteTag(element, par) {    
    // element.parentNode.remove();
    // // turn the dropdown content back to white
    // par.style.backgroundColor = 'white';

    // // if its in the filter dropdown, go through list of hidden tasks
    //     // if no filter tags, show all hidden; else
    //     // if hidden,
    //     // if all tags in filter tags,
    //     // show

    var tagList = element.parentNode.parentNode;

    element.parentNode.remove();

    // turn the dropdown content back to white

    par.style.backgroundColor = 'white';



    // if its in the filter dropdown, go through list of hidden tasks

    if (tagList.id == "tags") {

        var listOfTasks = document.getElementById("tasks").children;    // list of tasks + their content
        var theTags = tagList.querySelectorAll("li");   // list of tags

        if (theTags.length == 0) {
            // no filter tags, show all tasks
            for (let i=0; i<listOfTasks.length;i=i+2) {
                listOfTasks[i].style.display = "block";
            }
            return;
        }

        // has filter tags

        for (let i=0; i<listOfTasks.length;i=i+2) {
            // for each task
            if (listOfTasks[i].style.display == "block") {
                // already visible, so skip this tag
                continue;
            }

            var found = 0;
            for (let j=0; j<theTags.length; j++) {
                // for each filter tag, if all in Task tags, add to found counter
                //console.log(theTags[j].textContent.slice(0, -1));
                var array = Array.from(listOfTasks[i+1].querySelectorAll("li")).map(w => w.textContent);
                if (array.includes(theTags[j].textContent.slice(0, -1))) {
                    found++;
                    if (found == theTags.length) {
                        break;
                    }
                }
            }

            if (found == theTags.length) {
                // show if found all filter tags in task tags
                listOfTasks[i].style.display = "block";
            }
        }
    }
}


function selectPriority(element) {
    // "selects" priority in the task creation menu
    const par = document.querySelectorAll(".create-priority-menu li");
    for (let i=0; i<par.length; i++) {
        par[i].style.backgroundColor = "inherit";   // resets color
    }
    element.style.backgroundColor = "#bababa8a";    // "selected" color
}


// when the create task Modal is hidden, reset all the input fields
$('#exampleModal').on('hidden.bs.modal', function (e) {
    const par = document.querySelectorAll('.create-priority-menu li');
    for (let i=0; i<par.length; i++) {
        par[i].style.backgroundColor = "inherit";   // resets color
    }
    // reset selected tags
    const m_tags = document.querySelectorAll('.create-tags-list button');
    for (let i=0; i<m_tags.length; i++) {
        m_tags[i].click();
    }
    // reset title, description text
    document.getElementById('create-task-title').value = '';
    document.getElementById('create-task-description').value = '';
    document.getElementById('create-task-description').style.height = 'auto';
    // reset deadline
    document.getElementById('create-deadline').value = '';
    // reset invalid statemenet
    document.getElementById("create-invalid-statement").textContent = "";
})


function createTask() {
    // check if inputs are valid
    var taskTitle = document.getElementById("create-task-title").value;
    if (taskTitle.trim() == "") {
        document.getElementById("create-invalid-statement").textContent = "The Title cannot be blank!";
        return;
    }
    // if (document.getElementById("create-task-description").value.trim() == "") {
    //     document.getElementById("create-invalid-statement").textContent = "The Description cannot be blank!";
    //     return;
    // }
    const priorities = document.getElementById("priority-options").children;
    var selected = -1;
    for (let i=0; i<priorities.length; i++) {
        if (priorities[i].style.backgroundColor == "rgba(186, 186, 186, 0.54)") {
            selected = i;
        }
    }
    if (selected == -1) {
        document.getElementById("create-invalid-statement").textContent = "Please select a Priority!";
        return;
    }

    // Save data to localStorage
    
    var taskDescription = document.getElementById("create-task-description").value
    var tagsList = document.getElementById("create-tags-list").textContent; // SocialXWorkXAssignmentX
    var deadline = document.getElementById("create-deadline").value;
    
    var priority = "";
    if (selected == 0) {
        priority = "High";
    } else if (selected == 1) {
        priority = "Medium";
    } else {
        priority = "Low";
    }

    var timeStamp = new Date();
    timeStamp = timeStamp.getMilliseconds();

    var taskValue = {"title": taskTitle, "description": taskDescription, "tags": tagsList, "priority": priority, "deadline": deadline, "progress": " Not Started "};
    localStorage.setItem(timeStamp, JSON.stringify(taskValue));

    // create task object with li and div
    makeTaskObject(selected, timeStamp);
    // hide the modal
    $('#exampleModal').modal('hide');  // uses jQuery  
}


function makeTaskObject(m_priority, timeStamp) {
    // the "ul" object
    const taskList = document.getElementById("tasks");
    // create a "li" object
    const taskObject = document.createElement("li");
    taskList.appendChild(taskObject);
    taskObject.onclick = function() {collapsible(this)};
    taskObject.setAttribute("id", timeStamp);
    // the "li" children
    const taskIcon = document.createElement("span");    // task icon
    taskIcon.setAttribute("class", "task-icon");
    taskIcon.onclick = function() {changeStatus(this, timeStamp)};     // click = change status
    var icon = document.createElement("i");     // the icon
    icon.setAttribute("class", "fa fa-square-o");
    taskIcon.appendChild(icon);
    taskObject.appendChild(taskIcon);
    const taskTitle = document.createElement("span");   // the title
    taskTitle.setAttribute("class", "task-title");
    taskTitle.textContent = "  " + document.getElementById("create-task-title").value;
    taskObject.appendChild(taskTitle);
    const taskEdit = document.createElement("button");      // the edit button
    taskEdit.setAttribute("class", "task-edit");
    taskEdit.onclick = function() {editTask(this)};     // click = can edit this task
    taskEdit.setAttribute("data-bs-toggle", "modal");       // connect to modal
    taskEdit.setAttribute("data-bs-target", "#editModal");      // connect to edit modal
    var editIcon = document.createElement("i");     // edit icon
    editIcon.setAttribute("class", "fa fa-pencil");
    editIcon.style.fontSize = "36px";
    taskEdit.appendChild(editIcon);
    taskObject.appendChild(taskEdit);
    const taskStatus = document.createElement("span");      // the status text
    taskStatus.setAttribute("class", "task-status");
    taskStatus.textContent = "Not Started";     // default status text value
    taskStatus.style.color = "rgb(217, 8, 8)";
    taskObject.appendChild(taskStatus);
    // add to the "ul"

    // the "div" content object
    const contentObject = document.createElement("div");
    contentObject.setAttribute("class", "task-content");
    var insideDiv = document.createElement("div");
    // task priority
    var taskPriority = document.createElement("span");  // the priority
    taskPriority.setAttribute("class", "task-priority");
    var priorityIcon = document.createElement("i");     // priority icon
    priorityIcon.style.fontSize = "24px";
    priorityIcon.setAttribute("class", "fa fa-exclamation-triangle");
    // color and text of priority stuff based on selection
    if (m_priority == 0) {
        // high
        priorityIcon.style.color = "rgb(220, 12, 12)";
        taskPriority.textContent = " High ";
    } else if (m_priority == 1) {
        // medium
        priorityIcon.style.color = "rgb(232, 155, 100)";
        taskPriority.textContent = " Medium ";
    } else {
        // low
        priorityIcon.style.color = "rgb(212, 195, 45)";
        taskPriority.textContent = " Low ";
    }
    insideDiv.appendChild(priorityIcon);
    insideDiv.appendChild(taskPriority);
    // add tags
    var tagList = document.createElement("ul");
    tagList.setAttribute("class", "task-tags");

    // iterate through tags and append them to tagList
    var createTaskList = document.getElementById("create-tags-list").children;
    for (let i=0; i<createTaskList.length; i++) {
        var e = document.createElement("li");
        e.textContent = createTaskList[i].textContent.slice(0, -1);
        tagList.appendChild(e);
    }

    insideDiv.appendChild(tagList);
    contentObject.appendChild(insideDiv);
    // task description
    const taskDescription = document.createElement("div");
    taskDescription.setAttribute("class", "task-description");
    var e = document.createElement("p");
    e.textContent = document.getElementById('create-task-description').value;
    taskDescription.appendChild(e);
    contentObject.appendChild(taskDescription);
    // task deadline
    const taskDeadline = document.createElement("div");
    taskDeadline.setAttribute("class", "task-deadline");
    e = document.createElement("span");
    var deadline = document.getElementById("create-deadline").value;
    e.textContent = "" + deadline.slice(0,10) + " " + deadline.slice(11, 16);
    var _deadline = document.createElement("span");
    _deadline.style.display = "none";
    _deadline.textContent = deadline;
    taskDeadline.appendChild(e);
    taskDeadline.appendChild(_deadline);
    contentObject.appendChild(taskDeadline);
    // add div to the "ul"
    taskList.appendChild(contentObject);
}


function collapsible(element) {
    const content = element.nextElementSibling;
    if (content.style.display == "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}


function changeStatus(element, key) {
    // get current task value from local storage
    var currTask = JSON.parse(localStorage.getItem(key));
    // change icon and status to the next one
    var status = element.parentNode.getElementsByClassName("task-status")[0];
    if (element.getElementsByClassName("fa fa-clock-o").length == 1) {
        element.getElementsByClassName("fa fa-clock-o")[0].setAttribute("class", "fa fa-check-square-o");
        status.style.color = "green";
        status.textContent = " Completed ";
        currTask.progress = " Completed ";
    } else if (element.getElementsByClassName("fa fa-square-o").length == 1) {
        element.getElementsByClassName("fa fa-square-o")[0].setAttribute("class", "fa fa-clock-o");
        status.style.color = "rgb(209, 167, 27)";
        status.textContent = " In Progress ";
        currTask.progress = " In Progress ";
    } else if (element.getElementsByClassName("fa fa-check-square-o").length == 1) {
        element.getElementsByClassName("fa fa-check-square-o")[0].setAttribute("class", "fa fa-square-o");
        status.style.color = "rgb(217, 8, 8)";
        status.textContent = " Not Started ";
        currTask.progress = " Not Started ";
    }
    localStorage.setItem(key, JSON.stringify(currTask));
    element.parentNode.nextElementSibling.style.display = "block";
}

function editTask(element) {
    // show edit task modal 
    var parent = element.parentNode;
    currentTask = parent;
    var parentContent = parent.nextElementSibling;
    document.getElementById('edit-task-title').value = parent.querySelectorAll("span")[1].textContent;
    document.getElementById('edit-task-description').value = parentContent.querySelectorAll("p")[0].textContent;
    document.getElementById('edit-deadline').value = parentContent.querySelectorAll("span")[2].textContent;
    // select priority
    var this_priority = parentContent.querySelectorAll("span")[0].textContent;
    if (this_priority == " High ") {
        document.getElementById('edit-priority-high').style.backgroundColor = '#bababa8a';
    } else if (this_priority == " Medium ") {
        document.getElementById('edit-priority-medium').style.backgroundColor = '#bababa8a';
    } else if (this_priority == " Low ") {
        document.getElementById('edit-priority-low').style.backgroundColor = '#bababa8a';
    }
    // select tags
    var tags = parentContent.querySelectorAll("li");
    var theTags = document.getElementById("edit-dropdown-tags-content").querySelectorAll("a");
    // var tagArray = [];
    // for (let i=0; i<tags.length; i++) {
    //     tagArray.push(tags[i].textContent);
    // }
    // faster, but in the wrong order
    // for (let i=0; i<theTags.length; i++) {
    //     if (tagArray.includes(theTags[i].textContent)) {
    //         theTags[i].click();
    //     }
    // }
    for (let i=0; i<tags.length; i++) {
        for (let j=0; j<theTags.length; j++) {
            if (tags[i].textContent == theTags[j].textContent) {
                theTags[j].click();
                break;
            }
        }
    }

    // ensures that the content is not moving up and down
    if (parentContent.style.display == "block") {
        parentContent.style.display = "none";
    } else {
        parentContent.style.display = "block";
    }
}

// on dismiss of edit task modal, clear input fields
$('#editModal').on('hidden.bs.modal', function (e) {
    const par = document.querySelectorAll('.create-priority-menu li');
    for (let i=0; i<par.length; i++) {
        par[i].style.backgroundColor = "inherit";   // resets color
    }
    // reset selected tags
    const m_tags = document.querySelectorAll('.create-tags-list button');
    for (let i=0; i<m_tags.length; i++) {
        m_tags[i].click();
    }
    // reset title, description text
    document.getElementById('edit-task-title').value = '';
    document.getElementById('edit-task-description').value = '';
    document.getElementById('edit-task-description').style.height = 'auto';
    // reset deadline
    document.getElementById('edit-deadline').value = '';
    // reset invalid statemenet
    document.getElementById("edit-invalid-statement").textContent = "";
})


// cancel / save button
function saveTask() {
    // currentTask = the last edit
    // change task to stuff in the edit modal
    if (document.getElementById("edit-task-title").value.trim() == "") {
        // if empty, show error
        document.getElementById("edit-invalid-statement").textContent = "The Title cannot be blank!";
        return;
    }
    // update title
    var taskTitle = document.getElementById("edit-task-title").value;
    currentTask.querySelectorAll("span")[1].textContent = taskTitle;
    var taskContent = currentTask.nextElementSibling;
    // update description
    var taskDescription = document.getElementById("edit-task-description").value;
    taskContent.querySelectorAll("p")[0].textContent = taskDescription;
    // Update date
    var deadline = document.getElementById("edit-deadline").value;
    taskContent.querySelectorAll("span")[1].textContent =  " " + deadline.slice(0,10) + " " + deadline.slice(11, 16);
    taskContent.querySelectorAll("span")[2].textContent = deadline;
    // update Priority
    var priorityText = "";
    // check which priority
    const priorities = document.getElementById("edit-priority-options").children;
    var selected = -1;
    for (let i=0; i<priorities.length; i++) {
        if (priorities[i].style.backgroundColor == "rgba(186, 186, 186, 0.54)") {
            selected = i;
        }
    }
    // change icon color and text
    var priorityIcon = taskContent.querySelectorAll("i")[0];
    var taskPriority = taskContent.querySelectorAll("span")[0];
    if (selected == 0) {
        // high
        priorityIcon.style.color = "rgb(220, 12, 12)";
        taskPriority.innerText = " High ";
        priorityText = "High";
    } else if (selected == 1) {
        // medium
        priorityIcon.style.color = "rgb(232, 155, 100)";
        taskPriority.innerText = " Medium ";
        priorityText = "Medium"
    } else {
        // low
        priorityIcon.style.color = "rgb(212, 195, 45)";
        taskPriority.innerText = " Low ";
        priorityText = "Low";
    }

    // update tags
    // get tags from modal, paste onto task
    var tagsContent = document.getElementById("edit-tags-list").textContent;
    var editTagList = document.getElementById("edit-tags-list").querySelectorAll("li");
    var taskTagList = taskContent.querySelectorAll("ul")[0];
    // delete all the existing <li> items and repopulate
    taskTagList.innerHTML = "";
    for (let i=0; i<editTagList.length; i++) {
        // repopulate
        var e = document.createElement("li");
        e.textContent = editTagList[i].textContent.slice(0, -1);
        taskTagList.appendChild(e);
    }

    var progress = currentTask.getElementsByClassName("task-status")[0].innerHTML;

    var taskValue = {"title": taskTitle, "description": taskDescription, "tags": tagsContent, "priority": priorityText, "deadline": deadline, "progress": progress};
    localStorage.setItem(this.currentTask.id, JSON.stringify(taskValue));


    $('#editModal').modal('hide');  // uses jQuery  
}


function deleteTask(id) {
    // // uses global variable currentTask; just like saveTask
    var currentTaskContent = currentTask.nextElementSibling;
    currentTaskContent.remove();
    currentTask.remove();
    // localStorage.removeItem(this.currentTask.id);
    localStorage.removeItem(currentTask.id);
    $('#editModal').modal('hide');
}


function getWeather() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
    console.log(`data is ${JSON.stringify(data)}`);
    // Weather  data
    var main = data["weather"][0]["main"];
    var description = data["weather"][0]["description"];
    var weather_icon = data["weather"][0]["icon"];
    var icon_url = "<img src=https://openweathermap.org/img/wn/"+ weather_icon + "@2x.png>";
    var temp = data["main"]["temp"];

    document.getElementById("weatherstatus").innerHTML = main;
    document.getElementById("temp").innerHTML = temp + "°F";
    document.getElementById("weathericon").innerHTML = icon_url;
    console.log(icon_url);
})}

getWeather();    // updates weather once at the beginning of program
var weatherInterval = setInterval(function() {getWeather()}, 60000);    // every minute, refresh weather data

// clearInterval(weatherInterval);      // code to stop the interval
