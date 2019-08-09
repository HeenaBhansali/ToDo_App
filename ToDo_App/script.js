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
        editAndDel(li)
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
    completeBtn.addEventListener('click', function(e) {
        // console.log(e.target.parentNode)
        const textSpan = e.target.parentNode.querySelector('span')
        console.log(textSpan)
        if (textSpan.className === 'inactive') {
            completeBtn.innerHTML = ''
            textSpan.setAttribute('class', 'active')
        } else {
            completeBtn.innerHTML = '\u2714'
            textSpan.setAttribute('class', 'inactive')
        }
    })
}
const editAndDel = function(elem) {
    const delBtn = document.createElement('button')
    const editBtn = document.createElement('button')
    const del = document.createTextNode('delete')
    const edit = document.createTextNode('edit')
    delBtn.setAttribute('class', 'delete')
    editBtn.setAttribute('class', 'edit')
        // delBtn.className = 'delete'
        // editBtn.className = 'editaa'
    delBtn.appendChild(del)
    editBtn.appendChild(edit)
    elem.appendChild(delBtn)
    elem.appendChild(editBtn)
}
const deleter = function(e) {
    if (e.classList.contains('delete')) {
        // console.log(e)
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
        }
        document.addEventListener('click', function(e) {
            if (e.target.parentNode.querySelector('span').id !== 'editable') editmode()

            // if (e.target.id !== 'editable') editmode()
        })
        editContent.addEventListener('keypress', function(e) {
                if (e.code === 'Enter') editmode()
            })
            // const textValue = elem.parentElement.firstChild.innerText
            // const newValue = prompt('Editing', textValue)
            // elem.parentElement.firstChild.innerText = newValue || textValue
            // elem.parentElement.classList.remove('checked')
    }
    setlocalStorage()
}

const checkClick = function(func) {
    console.log()
    ul.addEventListener('click', function(event) {
        const target = event.target
        func(target)
    })
}

const setlocalStorage = function() {
    const str = JSON.stringify(ul.innerHTML)
        // console.log('set' + str)
    localStorage.setItem('todos', str)
}

const getlocalStorage = function() {
    const str = localStorage.getItem('todos')
    console.log('get' + str)
    ul.innerHTML = JSON.parse(str)
}

getlocalStorage()
document.getElementById('add').addEventListener('click', add)
document.getElementById('text').addEventListener('keypress', function(e) {
    if (e.code === 'Enter') add()
})

// btn.onclick = createElement
// checkClick(checkToggle)
checkClick(deleter)
checkClick(editor)
    // checkClick(complete)