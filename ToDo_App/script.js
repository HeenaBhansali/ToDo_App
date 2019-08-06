document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('text').value
    console.log(value)
    if (value) {
        addItem(value)
    }
})

function addItem(item) {
    var node = document.createElement('p')
        //var textnode = document.createTextNode(item)
        //node.appendChild(textnode)
    node.innerHTML = item
    document.querySelector('.item').appendChild(node)
}