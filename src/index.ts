(function greeter() {
    console.log('Hello from a TypeScript file.');
})()


window.onload = function htmlGreeter () {
    var element = document.createElement('p')
    element.innerHTML = 'Hello from a TypeScript file.';
    document.body.appendChild(element)
}
