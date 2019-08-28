const div = document.getElementById('item')
const button = document.getElementById('add')
const input = document.getElementById('text')

let itemsArray

if (localStorage.getItem('items')) {
    itemsArray = JSON.parse(localStorage.getItem('items'))
} else {
    itemsArray = []
}

localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))

const divMaker = text => {
    const divitem = document.createElement('div')
    divitem.textContent = text
    div.appendChild(divitem)
}
button.addEventListener('click', function(e) {
    let count = itemsArray.length + 1
    let val = input.value
    let obj = {
        id: count,
        value: val
    }

    itemsArray.push(obj)
        //   console.log(obj.val)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    divMaker(input.value)
    input.value = ''
})

data.forEach(item => {
    divMaker(item)
})

// const ul = document.getElementById('list')

// const add = function () {
//   const li = document.createElement('li')
//   const liText = document.getElementById('text').value.trim()
//   const textSpan = document.createElement('span')
//   const text = document.createTextNode(liText)
//   textSpan.appendChild(text)
//   textSpan.setAttribute('class', 'textSpan')
//   textSpan.setAttribute('id', 'lispan')
//   if (liText === '') {
//     alert('Enter your task!')
//   } else {
//     complete(li)
//     li.appendChild(textSpan)
//     notesEditDel(li)
//     ul.appendChild(li)
//     document.getElementById('text').value = ''
//     setlocalStorage()
//   }
// }
// const complete = function (e) {
//   const completeBtn = document.createElement('button')
//   const complete = document.createTextNode('')
//   completeBtn.setAttribute('class', 'complete')
//   completeBtn.appendChild(complete)
//   e.appendChild(completeBtn)
// }
// const compFunc = function (e) {
//   if (e.classList.contains('complete')) {
//     const textSpan = e.parentNode.querySelector('span')
//     console.log(textSpan)
//     if (textSpan.className === 'inactive') {
//       e.parentNode.firstChild.innerHTML = ''
//       textSpan.seitemsArraytAttribute('class', 'active')
//     } else {
//       e.parentNode.firstChild.innerHTML = '\u2714'
//       textSpan.setAttribute('class', 'inactive')
//     }
//   }
//   setlocalStorage()
// }

// const notesEditDel = function (e) {
//   const notesBtn = document.createElement('button')
//   const delBtn = document.createElement('button')
//   const editBtn = document.createElement('button')
//   const notes = document.createTextNode('notes')
//   const del = document.createTextNode('delete')
//   const edit = document.createTextNode('edit')
//   notesBtn.setAttribute('class', 'notes')
//   delBtn.setAttribute('class', 'delete')
//   editBtn.setAttribute('class', 'edit')
//   notesBtn.appendChild(notes)
//   delBtn.appendChild(del)
//   editBtn.appendChild(edit)

//   e.appendChild(delBtn)
//   e.appendChild(editBtn)
//   //   e.appendChild(notesBtn)
// }

// const delFunc = function (e) {
//   if (e.classList.contains('delete')) {
//     console.log(e.target)
//     e.parentNode.parentNode.removeChild(e.parentNode)
//     setlocalStorage()
//   }
// }

// const editFunc = function (e) {
//   if (e.classList.contains('edit')) {
//     const editContent = e.parentNode.querySelector('span')
//     editContent.setAttribute('id', 'editable')
//     editContent.contentEditable = true
//     editContent.focus()
//     const editmode = function (e) {
//       editContent.contentEditable = false
//       editContent.blur()
//       editContent.setAttribute('id', 'lispan')
//       setlocalStorage()
//     }
//     document.addEventListener('click', function (e) {
//       if (e.target.parentNode.querySelector('span').id !== 'editable') editmode()
//     })
//     editContent.addEventListener('keypress', function (e) {
//       if (e.code === 'Enter') editmode()
//     })
//   }
//   setlocalStorage()
// }

// const checkClick = function (func) {
//   ul.addEventListener('click', function (e) {
//     const target = e.target
//     console.log(target)
//     func(target)
//   })
// }

// const setlocalStorage = function () {
//   const str = JSON.stringify(ul.innerHTML)
//   localStorage.setItem('todos', str)
// }

// const getlocalStorage = function () {
//   const str = localStorage.getItem('todos')
//   ul.innerHTML = JSON.parse(str)
// }

// getlocalStorage()
// document.getElementById('add').addEventListener('click', add)
// document.getElementById('text').addEventListener('keypress', function (e) {
//   if (e.code === 'Enter') add()
// })

// checkClick(delFunc)
// checkClick(editFunc)
// checkClick(compFunc)