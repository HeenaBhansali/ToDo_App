const list = document.getElementById('list')
const input = document.querySelector('.task')
const notes = document.querySelector('.notes')
const date = document.querySelector('.date')
const add = document.querySelector('.add')
const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle-thin'
const LINE_THROUGH = 'lineThrough'
    // const ADDNOTE = 'fa-sticky-note'
    // const VIEWNOTE = 'fa-sticky-note-o'

let LIST, id

const data = localStorage.getItem('TODO')

if (data) {
    LIST = JSON.parse(data)
    let d = new Date()
    id = d.getTime()

    //   id = LIST.length
    loadList(LIST)
} else {
    LIST = []
    let d = new Date()
    id = d.getTime()

    //   id = 0
}

function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.id, item.name, item.notes, item.date, item.done)
    })
}

function addToDo(id, task, notes, date, done) {
    // id = d.getTime()

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : ''

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                  <div>  <h3 class="text ${LINE}">${task}</h3><p class ="note">${notes}</p></div>
                    <i class="fa fa-pencil  ed" job="edit" id="${id} "></i>
                    <i class="fa fa-sticky-note no" job="notes" id="${id} "></i>
                    
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                `

    const position = 'beforeend'

    list.insertAdjacentHTML(position, item)
}
add.addEventListener('click', function(event) {
    let d = new Date()
    id = d.getTime()
    const toDo = input.value
    const note = notes.value
    if (toDo) {
        addToDo(id, toDo, note, date, false)

        LIST.push({
            id: id,
            name: toDo,
            notes: note,
            date: date,
            done: false
                // note: 'addNote'

        })

        localStorage.setItem('TODO', JSON.stringify(LIST))

        //   id++

        input.value = ''
    }
})

function completeToDo(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)
        // console.log(LIST)
    for (var i = 0; i < LIST.length; i++) {
        if (LIST[i].id === Number(element.id)) {
            LIST[i].done = !LIST[i].done
        }
    }
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    for (var i = 0; i < LIST.length; i++) {
        if (LIST[i].id === Number(element.id)) {
            LIST.splice(i, 1)
        }
    }
}

function editToDo(element) {
    //   console.log(element.parentNode.querySelector('.text'))
    const editContent = element.parentNode.querySelector('.text')
        //   editContent.setAttribute('id', 'editable')
    editContent.contentEditable = true
    editContent.focus()

    //   editContent.setAttribute('id', 'lispan')
    //   setlocalStorage()
    //   document.addEventListener('click', function (e) {
    //     if (e.target.parentNode.querySelector('span').id !== 'editable') editmode()

    // if (e.target.id !== 'editable') editmode()
    //   })
    editContent.addEventListener('keypress', function(e) {
        if (e.code === 'Enter') {
            const updateText = editContent.innerHTML
            console.log(element.id)
            for (var i = 0; i < LIST.length; i++) {
                if (LIST[i].id === Number(element.id)) {
                    console.log(i)
                    console.log(LIST)
                    LIST[i].name = updateText
                    console.log(LIST)
                        //   updateText
                        //   LIST.splice(i, 1)
                }
            }
            editContent.contentEditable = false
            editContent.blur()
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
    })
}

// function noteToDo (element) {
//   const item = ` <p class="text ">jnnk</p>
//                 `

//   const position = 'afterend'

//   list.insertAdjacentHTML(position, item)
// }

list.addEventListener('click', function(event) {
    const element = event.target
    const elementJob = element.attributes.job.value
    if (elementJob === 'complete') completeToDo(element)
    if (elementJob === 'delete') removeToDo(element)
    if (elementJob === 'edit') editToDo(element)
        // if (elementJob == 'notes') noteToDo(element)

    localStorage.setItem('TODO', JSON.stringify(LIST))
})