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

const taskList = ["Task 1"]

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
        }
        else {
            e.childNodes[1].childNodes[3].style.textDecoration = "none"
        }
        // if (e.childNodes[1].childNodes[3].style.textDecoration = "line-through") {
        //     e.childNodes[1].childNodes[1].checked = true
        // }
        // else {
        //     e.childNodes[1].childNodes[1].checked = false
        // }
    })

}

formButtonClick = function() {
    formInputText = formInput.value
    if (formInputText !== "") {
        taskList.push(formInputText)
    }
    ulList.innerHTML += 
    `
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
    `
    formInput.value = ""

    checkboxes = document.querySelectorAll(".checkbox")
    checkboxes.forEach(function(e) {
        e.addEventListener("click", checkboxClick)
    });

    console.log(checkboxes)
}

formButton.addEventListener("click", formButtonClick)
checkboxes.forEach(function(e) {
    e.addEventListener("click", checkboxClick)
});
