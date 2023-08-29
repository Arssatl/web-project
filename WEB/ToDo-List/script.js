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
const checkbox = document.querySelector(".checkbox")
const label = document.querySelector(".label")

const taskList = ["Task 1"]
id = 1

formButtonClick = function() {
    formInputText = formInput.value
    if (formInputText !== "") {
        taskList.push(formInputText)
    }
    ulList.innerHTML += 
    `
        <li>
            <div class="task">
                <input type="checkbox" id="task-${id}" class="checkbox">
                <label for="task-${id}">${formInputText}</label>
            </div>
            <div>
                <img src="icons/edit.png" class="edit">
                <img src="icons/delete.png" class="delete">
            </div>
        </li>
    `
    id += 1
    formInput.value = ""
    console.log(taskList)
}

checkboxClick = function() {
    if (checkbox.checked) {
        label.style.textDecoration = "line-through"
    }
    else {
        label.style.textDecoration = "none"
    }
}

formButton.addEventListener("click", formButtonClick)
checkbox.addEventListener("click", checkboxClick)
