/*
<li>
    <div class="task">
        <input type="checkbox" id="task-1" class="checkbox">
        <label for="task-1">Task 1</label>
    </div>
    <div>
        <img src="icons/edit.png" class="edit">
        <img src="icons/delete.png" class="delete">
    </div>
</li>
*/
const formInput = document.querySelector(".form__input")
const formButton = document.querySelector(".form__button")
const ulList = document.querySelector(".list")
const label = document.querySelector(".label")

checkboxes = document.querySelectorAll(".checkbox")
tasks = document.querySelectorAll("li")

const taskList = []

checkboxClick = function() {
    // if (checkbox.checked) {
    //     label.style.textDecoration = "line-through"
    // }
    // else {
    //     label.style.textDecoration = "none"
    // }
    tasks = document.querySelectorAll("li")
    tasks.forEach(function(e){
        if (e.childNodes[1].childNodes[1].checked) {
            e.childNodes[1].childNodes[3].style.textDecoration = "line-through"
            id = e.childNodes[1].childNodes[1].id
            task = JSON.parse(localStorage.getItem(id))
            task.check = true
            localStorage.setItem(id, JSON.stringify(task))
        }
        else {
            e.childNodes[1].childNodes[3].style.textDecoration = "none"
            id = e.childNodes[1].childNodes[1].id
            task = JSON.parse(localStorage.getItem(id))
            task.check = false
            localStorage.setItem(id, JSON.stringify(task))
        }
        // if (e.childNodes[1].childNodes[3].style.textDecoration = "line-through") {
        //     e.childNodes[1].childNodes[1].checked = true
        // }
        // else {
        //     e.childNodes[1].childNodes[1].checked = false
        // }
    })
    console.log(tasks) 
}

formButtonClick = function() {
    formInputText = formInput.value
    if (formInputText !== "") {
        taskList.push(formInputText)
    }
    ulList.innerHTML += 
    `
        <li id="${localStorage.length}">
            <div class="task">
                <input type="checkbox" id="${localStorage.length}" class="checkbox">
                <label class="label" for="${localStorage.length}">${formInputText}</label>
            </div>
            <div class="buttons">
                <img src="icons/edit.png" class="edit">
                <img src="icons/delete.png" class="delete">
            </div>
        </li>
    `
    formInput.value = ""

    checkboxes = document.querySelectorAll(".checkbox")
    checkboxes.forEach(function(e) {
        e.addEventListener("change", checkboxClick)
    });

    tasks = document.querySelectorAll("li")
    tasks.forEach(function(e){
        if (e.childNodes[1].childNodes[3].style.textDecoration == "line-through") {
            e.childNodes[1].childNodes[1].checked = true
        }
        else {
            e.childNodes[1].childNodes[1].checked = false
        }
    })

    checkboxes = document.querySelectorAll(".checkbox")
    checkboxes.forEach(function(e) {
        e.addEventListener("click", checkboxClick)
    });

    console.log(checkboxes)

    localStorage.setItem(localStorage.length, JSON.stringify({id: localStorage.length, check: false, label: formInputText}))
}

const list = document.querySelector(".list")
for (i = 0; i < localStorage.length; i++) {
    task = JSON.parse(localStorage.getItem(localStorage.key(i)))
    if (task.check) {
        checked = "checked"
    }
    else {
        checked = ""
    }
    list.innerHTML += `
    <li id="${task.id}">
        <div class="task">
            <input type="checkbox" id="task-${task.id}" class="checkbox" ${checked}>
            <label for="task-${task.id}" class="label">${task.label}</label>
        </div>
        <div class="buttons">
            <img src="icons/edit.png" class="edit">
            <img src="icons/delete.png" class="delete">
        </div>
    </li>
    `
}

tasks = document.querySelectorAll("li")
tasks.forEach(function(e){
    if (e.childNodes[1].childNodes[1].checked) {
        e.childNodes[1].childNodes[3].style.textDecoration = "line-through"
    }
    else {
        e.childNodes[1].childNodes[3].style.textDecoration = "none"
    }
})

formButton.addEventListener("click", formButtonClick)
checkboxes.forEach(function(e) {
    e.addEventListener("click", checkboxClick)
});

// task = "aaa"
// console.log(localStorage.getItem("task 1"))
// localStorage.setItem("task 1", task)
// console.log(localStorage.getItem("task 1"))
// localStorage.removeItem("task 1")
// tl = ["a", "b", "c"]
// localStorage.setItem("TaskList", JSON.stringify(tl))
// console.log(tl)
// console.log(JSON.parse(localStorage.getItem("TaskList")))

//localStorage.clear()

/* 
<li id="${taskList.length}">
    <div class="task">
        <input type="checkbox" id="task-${taskList.length}" class="checkbox">
        <label class="label" for="task-${taskList.length}">${formInputText}</label>
    </div>
    <div class="buttons">
        <img src="icons/edit.png" class="edit">
        <img src="icons/delete.png" class="delete">
    </div>
</li> 
*/


