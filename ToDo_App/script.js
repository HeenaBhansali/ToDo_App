var ul = document.getElementById('list')

document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('text').value
    console.log(value)
    if (value) {
        addItem(value)
    }
})

function addItem(item) {
    var node = document.createElement('li')
    var textNode = document.createTextNode(item)

    var edit = document.createElement('button')
    edit.innerHTML = 'Edit'
    edit.setAttribute('class', 'edit')
    edit.addEventListener('click', function() {})

    var remove = document.createElement('button')
    remove.innerHTML = 'Delete'
    remove.setAttribute('class', 'remove')
    remove.addEventListener('click', function(e) {
        // console.log(e.target.parentNode)
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    })

    var radioInput = document.createElement('input')
    radioInput.setAttribute('type', 'radio')
    radioInput.setAttribute('class', 'complete')
        //   var complete = document.createElement('')
    document.getElementById('text').value = ''
    node.append(radioInput)
    node.appendChild(textNode)
    node.append(remove, edit)
    ul.appendChild(node)
}