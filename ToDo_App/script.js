// const liElements = document.getElementsByTagName('li')
const ul = document.getElementById('list')
    // const btn = document.getElementById('add')

// const add = function() {
//   const value = document.getElementById('text').value.trim()
//   console.log(value)
//   if (value !== '') {
//       addItem(value)
//   }
// }

const add = function() {
    const li = document.createElement('li')
    const liText = document.getElementById('text').value
    const textSpan = document.createElement('span')
    const text = document.createTextNode(liText)
    textSpan.appendChild(text)
    textSpan.setAttribute('class', 'textSpan')
    textSpan.setAttribute('id', 'lispan')
    if (liText === '') {
        alert('Enter your task!')
    } else {
        complete(li)
        li.appendChild(textSpan)
        notesEditDel(li)
        ul.appendChild(li)
        document.getElementById('text').value = ''
        setlocalStorage()
    }
}
const complete = function(elem) {
    const completeBtn = document.createElement('button')
    const complete = document.createTextNode('')
    completeBtn.setAttribute('class', 'complete')
    completeBtn.appendChild(complete)
    elem.appendChild(completeBtn)
}
const taskDone = function(e) {
    if (e.classList.contains('complete')) {
        // console.log(e.target.parentNode)
        const textSpan = e.parentNode.querySelector('span')
        console.log(textSpan)
        if (textSpan.className === 'inactive') {
            e.parentNode.firstChild.innerHTML = ''
            textSpan.setAttribute('class', 'active')
        } else {
            e.parentNode.firstChild.innerHTML = '\u2714'
            textSpan.setAttribute('class', 'inactive')
        }
    }
    setlocalStorage()
}

const notesEditDel = function(elem) {
    const notesBtn = document.createElement('button')
    const delBtn = document.createElement('button')
    const editBtn = document.createElement('button')
    const notes = document.createTextNode('notes')
    const del = document.createTextNode('delete')
    const edit = document.createTextNode('edit')
    notesBtn.setAttribute('class', 'notes')
    delBtn.setAttribute('class', 'delete')
    editBtn.setAttribute('class', 'edit')
    notesBtn.appendChild(notes)
    delBtn.appendChild(del)
    editBtn.appendChild(edit)

    elem.appendChild(delBtn)
    elem.appendChild(editBtn)
    elem.appendChild(notesBtn)
}
const notes = function(e) {
    if (e.classList.contains('notes')) {
        console.log(e.className)
    }
}
const deleter = function(e) {
    if (e.classList.contains('delete')) {
        e.parentNode.parentNode.removeChild(e.parentNode)
        setlocalStorage()
    }
}

const editor = function(e) {
    if (e.classList.contains('edit')) {
        const editContent = e.parentNode.querySelector('span')
        editContent.setAttribute('id', 'editable')
        editContent.contentEditable = true
        editContent.focus()
        const editmode = function(e) {
            editContent.contentEditable = false
            editContent.blur()
            editContent.setAttribute('id', 'lispan')
            setlocalStorage()
        }
        document.addEventListener('click', function(e) {
            if (e.target.parentNode.querySelector('span').id !== 'editable') editmode()

            // if (e.target.id !== 'editable') editmode()
        })
        editContent.addEventListener('keypress', function(e) {
            if (e.code === 'Enter') editmode()
        })
    }
    setlocalStorage()
}

const checkClick = function(func) {
    ul.addEventListener('click', function(event) {
        const target = event.target
        func(target)
    })
}

const setlocalStorage = function() {
    const str = JSON.stringify(ul.innerHTML)
    localStorage.setItem('todos', str)
}

const getlocalStorage = function() {
    const str = localStorage.getItem('todos')
    ul.innerHTML = JSON.parse(str)
}

getlocalStorage()
document.getElementById('add').addEventListener('click', add)
document.getElementById('text').addEventListener('keypress', function(e) {
    if (e.code === 'Enter') add()
})

checkClick(deleter)
checkClick(editor)
checkClick(taskDone)
checkClick(notes)