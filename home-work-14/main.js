function showMenu(element, x, y) {
    let classList = element.classList,
        style = element.style,
        hideClass = 'hide',
        pxUnit = 'px';

    style.left = x + pxUnit;
    style.top = y + pxUnit;

    classList.remove(hideClass);

    element.addEventListener('click', () => {
        classList.add(hideClass);
    }, {once: true});

    document.body.addEventListener('click', () => {
        classList.add(hideClass);
    }, {once: true});
};

document.body.addEventListener('contextmenu', (event) => {
    let clientX = event.clientX,
        clientY = event.clientY,
        menu = document.getElementById('menu');

    showMenu(menu, clientX, clientY);
    event.preventDefault();
});

