const ul = document.getElementById('list')

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

        delfunc(li)
        editfunc(li)
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
const delfunc = function(elem) {
    const delBtn = document.createElement('button')
    const del = document.createTextNode('delete')
    delBtn.setAttribute('class', 'delete')
    delBtn.appendChild(del)
    elem.appendChild(delBtn)
    delBtn.addEventListener('click', function(e) {
        console.log(e.target.parentNode)
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
        setlocalStorage()
    })
}
const editfunc = function(elem) {
    const editBtn = document.createElement('button')
    const edit = document.createTextNode('edit')
    editBtn.setAttribute('class', 'edit')
    editBtn.appendChild(edit)
    elem.appendChild(editBtn)
    editBtn.addEventListener('click', function(e) {
        const editContent = e.target.parentNode.querySelector('span')
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
        })
        editContent.addEventListener('keypress', function(e) {
            if (e.code === 'Enter') editmode()
        })
        setlocalStorage()
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