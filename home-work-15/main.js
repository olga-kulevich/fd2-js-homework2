function dragStart(event) {

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData("text", event.target.getAttribute('id'));
    event.dataTransfer.setDragImage(event.target,100,100);
    return true;
}

function dragEnter(event) {
    event.preventDefault();
    return true;
}

function dragOver(event) {
    event.preventDefault();
}

function dragDrop(event) {
    var data = event.dataTransfer.getData("text");

    event.preventDefault();

    event.target.appendChild(document.getElementById(data));
    document.getElementById(data).style.display = "none";

    if (document.getElementById("section").childElementCount === 0) {
        document.body.style.background = "black";
    }

    event.stopPropagation();
    return false;
}
