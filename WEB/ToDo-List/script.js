const formInput = document.querySelector(".form__input")
const formButton = document.querySelector(".form__button")
const ulList = document.querySelector(".list")
const completed = document.querySelector(".completed")
const total = document.querySelector(".total")
const completeAllButton = document.querySelector(".complete-all")
const deleteCompletedButton = document.querySelector(".delete-all")
const filterButton = document.querySelector(".filter")

checkboxes = document.querySelectorAll(".checkbox")
tasks = document.querySelectorAll(".li")
deletes = document.querySelectorAll(".delete")
edits = document.querySelectorAll(".edit")

editsIdList = []
const taskList = []

calcCompleted = function() {
    comp_count = 0
    for (i = 0; i < localStorage.length; i++) {
        comp_count += JSON.parse(localStorage.getItem(localStorage.key(i))).check
    }
    completed.innerHTML = comp_count
}

calcTotal = function() { 
    total_count = 0
    total.innerHTML = localStorage.length
}

deleteClick = function() {
    console.log(111)
}

handleEdit = function(id){
    item = document.getElementById(`${id}`)

    itemLabel = item.childNodes[1].childNodes[3].innerText
    item.childNodes[1].childNodes[3].style.display = "none"
    item.childNodes[1].innerHTML += `
        <input type="text" class="edit-input" id="edit-input-${id}" value="${itemLabel}"> <button class="edit-button" id="edit-button-${id}">&#10004;</button>
    `
    itemCheck = document.getElementById(`task-${id}`)
    console.log(itemCheck)
    task = JSON.parse(localStorage.getItem(id))
    if (task.check) {
        itemCheck.checked = true
        itemCheck.setAttribute("checked", "")
    }
    else {
        itemCheck.checked = false
    }
    console.log(itemCheck)


    editButton = document.getElementById(`edit-button-${id}`)
    editInput = document.getElementById(`edit-input-${id}`)
    editButton.addEventListener("click", (btn) => {
        editButtonId = btn.target.id.split("-")[2]
        editButton = document.getElementById(`edit-button-${editButtonId}`)
        editInput = document.getElementById(`edit-input-${editButtonId}`)
        completedItem = document.getElementById(editButtonId)
        editInputValue = editInput.value
        completedItem.childNodes[1].childNodes[3].innerText = editInputValue
        completedItem.childNodes[1].childNodes[3].style.display = "block"
        editsIdList = editsIdList.splice(String(id), 1)
        itemCheck = document.getElementById(`task-${editButtonId}`)
        task = JSON.parse(localStorage.getItem(editButtonId))
        if (itemCheck.checked) {
            completedItem.childNodes[1].childNodes[3].style.textDecoration = "line-through"
            task.check = true
        }
        else {
            completedItem.childNodes[1].childNodes[3].style.textDecoration = "none"
            task.check = false
        }
        localStorage.setItem(id, JSON.stringify(task))
        calcCompleted()
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        editInput.remove()
        editButton.remove()

        keys = Object.keys(localStorage)
        for (i = localStorage.length - 1; i >= 0; i--) {
            task = JSON.parse(localStorage.getItem(keys[i]))
            if (task.id == editButtonId) {
                task.label = editInputValue
                localStorage.setItem(keys[i], JSON.stringify(task))
            }
        }
        // console.log(id)
    })
}

checkboxClick = function() {
    tasks = document.querySelectorAll(".li")
    tasks.forEach(function(e){
        if (e.childNodes[1].childNodes[1].checked) {
            e.childNodes[1].childNodes[3].style.textDecoration = "line-through"
            console.log(e.id)
            id = e.id
            task = JSON.parse(localStorage.getItem(id))
            task.check = true
            localStorage.setItem(id, JSON.stringify(task))
        }
        else {
            e.childNodes[1].childNodes[3].style.textDecoration = "none"
            id = e.id
            task = JSON.parse(localStorage.getItem(id))
            task.check = false
            localStorage.setItem(id, JSON.stringify(task))
        }
    })
    console.log(tasks)

    calcCompleted()

    console.log(comp_count)

    completed.innerHTML = comp_count
}

formButtonClick = function() {
    formInputText = formInput.value
    if (formInputText !== "") {
        taskList.push(formInputText)
        keys = Object.keys(localStorage)
        console.log(keys)
        if (localStorage.length == 0) {
            id = 1
            console.log("!")
        } else {
            id = Number(Math.max(...keys)) + 1
        }
        ulList.innerHTML += 
        `
            <li class="li" id="${id}">
                <div class="task">
                    <input type="checkbox" id="task-${id}" class="checkbox">
                    <label class="label" for="task-${id}">${formInputText}</label>
                </div>
                <div class="buttons">
                    <img src="icons/edit.png" class="edit">
                    <img src="icons/delete.png" class="delete">
                </div>
            </li>
        `
        deletes = document.querySelectorAll(".delete")
        deletes.forEach(function(e) {
            e.addEventListener("click", () => {
                console.log(e.parentNode.parentNode.remove())
                id = Number(e.parentNode.parentNode.id)
                localStorage.removeItem(id)
                calcTotal()
                calcCompleted()
            })
        });
        keys = Object.keys(localStorage)
        console.log(keys)
        if (localStorage.length == 0) {
            id = 1
            console.log("!")
        } else {
            id = Number(Math.max(...keys)) + 1
        }
        console.log(id)
        localStorage.setItem(id, JSON.stringify({id: id, check: false, label: formInputText}))
    }
    formInput.value = ""

    checkboxes = document.querySelectorAll(".checkbox")
    checkboxes.forEach(function(e) {
        e.removeEventListener("change", checkboxClick)
        e.addEventListener("change", checkboxClick)
    });

    tasks = document.querySelectorAll(".li")
    tasks.forEach(function(e){
        if (e.childNodes[1].childNodes[3].style.textDecoration == "line-through") {
            e.childNodes[1].childNodes[1].checked = true
        }
        else {
            e.childNodes[1].childNodes[1].checked = false
        }
    })

    console.log(checkboxes)

    task = document.getElementById(id)
    edit = task.childNodes[3].childNodes[1]
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(edit)
    // edit.addEventListener("click", () => {
    //     id = edit.parentNode.parentNode.id
    //     if (!editsIdList.includes(id)) {
    //         editsIdList.push(id)
    //         handleEdit(id)
    //     }
    //     console.log(editsIdList)
    //     // console.log(edit.parentNode.parentNode.id)
    // })
    edits = document.querySelectorAll(".edit")
    edits.forEach((edit) => {
        edit.addEventListener("click", () => {
            id = edit.parentNode.parentNode.id
            if (!editsIdList.includes(id)) {
                editsIdList.push(id)
                handleEdit(id)
            }
            console.log(editsIdList)
            // console.log(edit.parentNode.parentNode.id)
        })
    })

    calcTotal()
}

keys = Object.keys(localStorage).map(e => Number(e)).sort((a,b) => a - b)
console.log(keys)

for (i = 0; i < localStorage.length; i++) {
    task = JSON.parse(localStorage.getItem(keys[i]))
    if (task.check) {
        checked = "checked"
    }
    else {
        checked = ""
    }
    ulList.innerHTML += `
    <li class="li" id="${task.id}">
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

checkboxes = document.querySelectorAll(".checkbox")
tasks = document.querySelectorAll(".li")
deletes = document.querySelectorAll(".delete")
edits = document.querySelectorAll(".edit")

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
deletes.forEach(function(e) {
    e.addEventListener("click", () => {
        console.log(e.parentNode.parentNode.remove())
        id = e.parentNode.parentNode.id
        localStorage.removeItem(id)
        calcTotal()
        calcCompleted()
    })
});

calcCompleted()

calcTotal()

completeAllButton.addEventListener("click", () => {
    checkboxes = document.querySelectorAll(".checkbox")
    checkboxes.forEach(e => {
        e.checked = true
    })
    tasks = document.querySelectorAll(".li")
    tasks.forEach(e => {
        e.childNodes[1].childNodes[3].style.textDecoration = "line-through"
    })
    keys = Object.keys(localStorage)
    for (i = 0; i < localStorage.length; i++) {
        task = JSON.parse(localStorage.getItem(keys[i]))
        task.check = true
        localStorage.setItem(keys[i], JSON.stringify(task))
    }
    calcCompleted()
})

deleteCompletedButton.addEventListener("click", () => {
    keys = Object.keys(localStorage)
    for (i = localStorage.length - 1; i >= 0; i--) {
        task = JSON.parse(localStorage.getItem(keys[i]))
        if (task.check) {
            localStorage.removeItem(keys[i])
        }
    }
    tasks = document.querySelectorAll(".li")
    tasks.forEach(e => {
        if (e.childNodes[1].childNodes[1].checked) {
            e.remove()
        }
    })
    calcCompleted()
    calcTotal()
})

filterButton.addEventListener("mouseover", () => {
    
})

const filterAllBtn = document.querySelector(".filter-all")
const filterCompletedBtn = document.querySelector(".filter-completed")
const filterUncompletedBtn = document.querySelector(".filter-uncompleted")
handleFilterAll = function() {
    console.log(filterAllBtn.checked)
    console.log(filterCompletedBtn.checked)
    console.log(filterUncompletedBtn.checked)
    tasks = document.querySelectorAll(".li")
        tasks.forEach(task => {
            task.style.display = "flex"
        })
}
handleFilterCompleted = function() {
    console.log(filterAllBtn.checked)
    console.log(filterCompletedBtn.checked)
    console.log(filterUncompletedBtn.checked)
    if (filterCompletedBtn.checked) {
        tasks = document.querySelectorAll(".li")
        tasks.forEach(task => {
            console.log(task.childNodes[1].childNodes[1])
            if (!task.childNodes[1].childNodes[1].checked) {
                task.style.display = "none"
            } else {
                task.style.display = "flex"
            }
        })
    }
}
handleFilterUncompleted = function() {
    console.log(filterAllBtn.checked)
    console.log(filterCompletedBtn.checked)
    console.log(filterUncompletedBtn.checked)
    if (filterUncompletedBtn.checked) {
        tasks = document.querySelectorAll(".li")
        tasks.forEach(task => {
            console.log(task.childNodes[1].childNodes[1])
            if (task.childNodes[1].childNodes[1].checked) {
                task.style.display = "none"
            } else {
                task.style.display = "flex"
            }
        })
    }
}
filterAllBtn.addEventListener("change", handleFilterAll)
filterCompletedBtn.addEventListener("change", handleFilterCompleted)
filterUncompletedBtn.addEventListener("change", handleFilterUncompleted)

edits.forEach((edit) => {
    edit.addEventListener("click", () => {
        id = edit.parentNode.parentNode.id
        if (!editsIdList.includes(id)) {
            editsIdList.push(id)
            handleEdit(id)
        }
        console.log(editsIdList)
        // console.log(edit.parentNode.parentNode.id)
    })
})