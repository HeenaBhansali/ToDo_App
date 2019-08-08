var ul = document.getElementById('list')
document.getElementById('text').focus()
var add = function() {
    var value = document.getElementById('text').value.trim()
    console.log(value)
    if (value !== '') {
        addItem(value)
    }
}
document.getElementById('add').addEventListener('click', add)
document.getElementById('text').addEventListener('keypress', function(e) {
    if (e.code === 'Enter') add()
})

function addItem(item) {
    var node = document.createElement('li')
    var snode = document.createElement('span')
    var textNode = document.createTextNode(item)
    snode.setAttribute('id', 'snode')
    snode.setAttribute('class', 'snode')

    var edit = document.createElement('button')
    edit.innerHTML = 'Edit'
    edit.setAttribute('class', 'edit')

    edit.addEventListener('click', function(e) {
        // console.log(e.target.parentNode)
        // document.querySelectorAll('.complete').disabled = true
        // e.target.parentNode.parentNode.querySelector('.remove').disabled = true

        var sp = e.target.parentNode.querySelector('span')
        sp.contentEditable = true
        sp.setAttribute('class', 'active')
        sp.focus()
            // document.getElementById('snode').focus()

        // var sp = document.getElementById('snode')
        console.log(sp)
        var editmode = function(e) {
            sp.contentEditable = false *
                snode.setAttribute('class', 'snode')
        }
        sp.addEventListener('mouseout', editmode)
        sp.addEventListener('keypress', function(e) {
            if (e.code === 'Enter') editmode()
        })

        // console.log(sp)
        // console.log(e.target.parentNode.firstChild)
        // e.target.parentNode.secondChild.contentEditable = true
        // e.parentNode().attr('contenteditable', 'true')

        // e.parent().attr('contenteditable', 'true')
    })

    var remove = document.createElement('button')
    remove.innerHTML = 'Delete'
    remove.setAttribute('class', 'remove')
    remove.addEventListener('click', function(e) {
        console.log(e.target.parentNode.parentNode)
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    })

    var complete = document.createElement('button')
        // complete.innerHTML = '\u2714'
        // complete.setAttribute('type', 'checkbox')
    complete.setAttribute('class', 'complete')
    complete.addEventListener('click', function(e) {
        if (snode.className === 'inactive') {
            complete.innerHTML = ''
            snode.setAttribute('class', 'active')
        } else {
            complete.innerHTML = '\u2714'
            snode.setAttribute('class', 'inactive')
        }
        // e.target.parentNode.setAttribute('class', 'inactive')
    })

    //   var complete = document.createElement('')
    document.getElementById('text').value = ''
    node.append(complete)
    snode.appendChild(textNode)
    node.append(snode)
    node.append(remove, edit)
        // node.setAttribute('class', 'active')

    ul.appendChild(node)
}