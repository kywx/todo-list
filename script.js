
// Filter Dropdown Menu
function dropdown() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

var myDropdown = document.getElementById("dropdown-content");
window.onclick = function(e) {
    if (!e.target.matches(".filter-dropdown")) {
        if (myDropdown.classList.contains("show")) {
            myDropdown.classList.remove("show");
        }
    }
}

// Create Task dropdown menus
function dropdownTags() {
    document.getElementById("dropdown-tags-content").classList.toggle("show");
}

var tagDropdown = document.getElementById("dropdown-tags-content");
window.onclick = function(e) {
    if (!e.target.matches(".tags-dropdown")) {
        if (tagDropdown.classList.contains("show")) {
            tagDropdown.classList.remove("show");
        }
    }
}

function dropdownPriority() {
    document.getElementById("dropdown-priority-content").classList.toggle("show");
}

var priorityDropdown = document.getElementById("dropdown-priority-content");
window.onclick = function(e) {
    if (!e.target.matches(".priority-dropdown")) {
        if (priorityDropdown.classList.contains("show")) {
            priorityDropdown.classList.remove("show");
        }
    }
}


// Filter tag creation/removal
const tags = document.getElementById("tags");

function createTag(element) {
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
}

function deleteTag(element, par) {    
    element.parentNode.remove();
    // turn the dropdown content back to white
    par.style.backgroundColor = 'white';
}

