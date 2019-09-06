const list = document.getElementById('list')
const input = document.querySelector('.task')
const notes = document.querySelector('.notes')
const date = document.querySelector('.date')
const add = document.querySelector('.add')
const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle-thin'
const disable = 'disabled'
    // const ADDNOTE = 'fa-sticky-note'
    // const VIEWNOTE = 'fa-sticky-note-o'

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
        addToDo(item.id, item.name, item.notes, item.date, item.done)
    })
}

function addToDo(id, task, notes, date, done) {
    // id = d.getTime()
    console.log(date)
    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? disable : ''

    const item = `<div class="newlist"><li class="item">
                   <div> <i class="fa ${DONE} co" job="complete" id="${id}"></i></div>
                  <div class ="listtext ${LINE}">  <h3 class="text  ">${task}</h3><p class ="note">${notes}</p></div>
                  <div><p class="adddate ${LINE}">${date}</p></div>  
                  <div><i class="fa fa-pencil ${LINE} ed" job="edit" id="${id} "></i></div>
                   <div> <i class="fa fa-trash-o ${LINE} de" job="delete" id="${id}"></i></div>
                    </li></div>
                `

    const position = 'beforeend'

    list.insertAdjacentHTML(position, item)
}
add.addEventListener('click', function(event) {
    let d = new Date()
    let id = d.getTime()
    var date = document.getElementById('date').value
    const toDo = input.value
    const note = notes.value
    if (toDo) {
        addToDo(id, toDo, note, date, false)
        let LIST = getLIST()
        LIST.push({
            id: id,
            name: toDo,
            notes: note,
            date: date,
            done: false
                // note: 'addNote'

        })

        setLIST(LIST)
            //   id++

        input.value = ''
        notes.value = ''
    }
})

function completeToDo(element, LIST) {
    //   let LIST = getLIST()
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.parentNode.querySelector('.listtext').classList.toggle(disable)
    element.parentNode.parentNode.querySelector('.ed').classList.toggle(disable)
    element.parentNode.parentNode.querySelector('.de').classList.toggle(disable)
    element.parentNode.parentNode.querySelector('.adddate').classList.toggle(disable)

    // console.log(LIST)
    for (var i = 0; i < LIST.length; i++) {
        if (LIST[i].id === Number(element.id)) {
            LIST[i].done = !LIST[i].done
        }
    }
    setLIST(LIST)
}

function removeToDo(element, LIST) {
    //   let LIST = getLIST()
    console.log(element.parentNode.parentNode)
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)
    for (var i = 0; i < LIST.length; i++) {
        if (LIST[i].id === Number(element.id)) {
            LIST.splice(i, 1)
        }
    }
    setLIST(LIST)
}

function editToDo(element, LIST) {
    //   console.log(element.parentNode.parentNode.querySelector('.listtext').querySelector('.text'))
    //   console.log(element.parentNode.querySelector('#text'))
    const editContent = element.parentNode.parentNode.querySelector('.listtext').querySelector('.text')
    const noteContent = element.parentNode.parentNode.querySelector('.listtext').querySelector('.note')
        //   const noteContent = element.parentNode.querySelector('.note')
        //   editContent.setAttribute('id', 'editable')
    editContent.contentEditable = true
    let content = editContent.textContent
    noteContent.contentEditable = true
    editContent.focus()
    noteContent.focus()

    //   editContent.setAttribute('id', 'lispan')
    //   setlocalStorage()
    //   document.addEventListener('click', function (e) {
    //     if (e.target.parentNode.querySelector('span').id !== 'editable') editmode()

    // if (e.target.id !== 'editable') editmode()
    //   })
    editContent.addEventListener('keypress', function(e) {
        // let LIST = getLIST()
        if (e.code === 'Enter') {
            const updateText = editContent.textContent
            const updateNote = noteContent.textContent
            console.log(element.id)

            for (var i = 0; i < LIST.length; i++) {
                if (LIST[i].id === Number(element.id)) {
                    //   console.log(i)
                    //   console.log(LIST)
                    console.log('jhg')
                    LIST[i].name = updateText
                    LIST[i].notes = updateNote
                    console.log(LIST)
                        //   updateText
                        //   LIST.splice(i, 1)
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

// function noteToDo (element) {
//   const item = ` <p class="text ">jnnk</p>
//                 `

//   const position = 'afterend'

//   list.insertAdjacentHTML(position, item)
// }

list.addEventListener('click', function(event) {
    let LIST = getLIST()
    const element = event.target
    const elementJob = element.attributes.job.value
    if (elementJob === 'complete') completeToDo(element, LIST)
    if (elementJob === 'delete') removeToDo(element, LIST)
    if (elementJob === 'edit') editToDo(element, LIST)
        // if (elementJob == 'notes') noteToDo(element)
        //   setLIST(LIST)
})