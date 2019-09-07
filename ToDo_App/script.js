const list = document.getElementById('list')
const input = document.querySelector('.task')
const notes = document.querySelector('.notes')
const add = document.querySelector('.add')
    // const rating = document.querySelector('.rating')

const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle-thin'
const disable = 'disabled'
    // const low = 'fa-circle low'
    // const low = 'fa-circle low'

init()

function init() {
    if (!getLIST()) setLIST([])
    console.log(getLIST())
    loadList(getLIST())
}

function getLIST() {
    return JSON.parse(localStorage.getItem('TODO'))
}

function setLIST(LIST) {
    localStorage.setItem('TODO', JSON.stringify(LIST))
}

function loadList(array) {
    array.forEach(function(item) {
        addToDo(item)
    })
}

function addToDo(todo) {
    const { id, name, notes, date, priorityId, done } = todo
    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? disable : ''

    const item = `<div class="newlist"><li class="item">
                   <div> <i class="fa ${DONE} co" job="complete" id="${id}"></i></div>
                  <div class ="listtext ${LINE}">  <h3 class="text  ">${name}</h3><p class ="note">${notes}</p></div>
                  <div><i class="fa fa-circle ${priorityId} " id="${id} "></i></div>
                  <div><p class="adddate ${LINE}">${date}</p></div>  
                  <div><i class="fa fa-pencil ${LINE} ed" job="edit" id="${id} "></i></div>
                   <div> <i class="fa fa-trash-o ${LINE} de" job="delete" id="${id}"></i></div>
                    </li></div>
                `

    const position = 'beforeend'

    list.insertAdjacentHTML(position, item)
    input.value = ''
    notes.value = ''
}
add.addEventListener('click', function(event) {
    var checkedRadio = document.getElementsByName('radio')

    for (let i = 0; i < checkedRadio.length; i++) {
        if (checkedRadio[i].checked) {
            var priority = checkedRadio[i].id
        }
    }
    const todo = {
        id: new Date().getTime(),
        name: input.value,
        notes: notes.value,
        date: document.getElementById('date').value,
        priorityId: priority,
        done: false
    }
    if (input.value) {
        updateStorage(todo)
        addToDo(todo)
    }
})

function updateStorage(todo) {
    let LIST = getLIST()
    LIST.push(todo)
    setLIST(LIST)
}

function completeToDo(element, LIST) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.parentNode.querySelector('.listtext').classList.toggle(disable)
    element.parentNode.parentNode.querySelector('.ed').classList.toggle(disable)
    element.parentNode.parentNode.querySelector('.de').classList.toggle(disable)
    element.parentNode.parentNode.querySelector('.adddate').classList.toggle(disable)
    for (let i = 0; i < LIST.length; i++) {
        if (LIST[i].id === Number(element.id)) {
            LIST[i].done = !LIST[i].done
        }
    }
    setLIST(LIST)
}

function removeToDo(element, LIST) {
    console.log(element.parentNode.parentNode)
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)
    for (let i = 0; i < LIST.length; i++) {
        if (LIST[i].id === Number(element.id)) {
            LIST.splice(i, 1)
        }
    }
    setLIST(LIST)
}

function editToDo(element, LIST) {
    const editContent = element.parentNode.parentNode.querySelector('.listtext').querySelector('.text')
    const noteContent = element.parentNode.parentNode.querySelector('.listtext').querySelector('.note')
    editContent.contentEditable = true
    let content = editContent.textContent
    noteContent.contentEditable = true
    editContent.focus()
    noteContent.focus()
    editContent.addEventListener('keypress', function(e) {
        if (e.code === 'Enter') {
            const updateText = editContent.textContent
            const updateNote = noteContent.textContent
            console.log(updateText)

            for (let i = 0; i < LIST.length; i++) {
                if (LIST[i].id === Number(element.id)) {
                    if (updateText !== '') {
                        LIST[i].name = updateText
                        LIST[i].notes = updateNote
                    } else {
                        LIST[i].name = content
                        LIST[i].notes = updateNote
                    }
                }
            }
            editContent.contentEditable = false
            editContent.blur()
            noteContent.contentEditable = false
            noteContent.blur()
        }
        setLIST(LIST)
    })
}

list.addEventListener('click', function(event) {
    let LIST = getLIST()
    const element = event.target
    const elementJob = element.attributes.job.value
    if (elementJob === 'complete') completeToDo(element, LIST)
    if (elementJob === 'delete') removeToDo(element, LIST)
    if (elementJob === 'edit') editToDo(element, LIST)
})