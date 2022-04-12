// functions stored here 

function buildElement(elementType, className, text) {
    let element = document.createElement(elementType)
    element.classList.add(className)
    element.innerText = text
    return element
}

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function monthToMonth(numberOfMonth) {
    return months[Number(numberOfMonth)-1]
}
function reformatDate(string) {
    return monthToMonth(string.slice(5,7)) + ' ' + string.slice(8,10) + ", " + string.slice(0,4)
}

