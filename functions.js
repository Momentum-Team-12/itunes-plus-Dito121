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
    if (string) {
        return monthToMonth(string.slice(5,7)) + ' ' + string.slice(8,10) + ", " + string.slice(0,4)
    } else {
        return ''
    }
}

function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
}

