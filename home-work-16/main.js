const firstForm = document.forms['first'],
    firstNameInput = firstForm.elements.firstName,
    secondNameInput = firstForm.elements.secondName,
    ageInput = firstForm.elements.age,
    emailInput = firstForm.elements.email,
    passwordInput = firstForm.elements.password,
    submitButton = firstForm.elements.submitButton;

const emailRegexp = /^\S+@\S+\.\S+$/,
    ageRegexp = /^(?:100|[1-9]\d|[6-9])$/,
    secondNameRegexp = /^[A-zА-яЁё]+$/,
    firstNameRegexp = /^[A-zА-яЁё]+$/,
    passwordRegexp =  /^[a-zA-Z0-9]{6,}$/;

function generateError(text) {
    var validationMessage = document.createElement('div');
    validationMessage.className = 'validationMessage';
    validationMessage.style.color = 'red';
    validationMessage.innerHTML = text;
    return validationMessage;
}

function validate() {
    var validationMessages = firstForm.querySelectorAll('.validationMessage');
    var valid = true;

    for (var i = 0; i < validationMessages.length; i++) {
        validationMessages[i].remove();
    }

    if (firstNameInput.value && !firstNameRegexp.test(firstNameInput.value)) {
        var validationMessage = generateError('Некорректное имя');
        firstNameInput.parentElement.insertBefore(validationMessage, firstNameInput);
        valid = false;
    } else if (!firstNameInput.value){
        valid = false;
    }

    if (secondNameInput.value && !secondNameRegexp.test(secondNameInput.value)) {
        var validationMessage = generateError('Некорректная фамилия');
        secondNameInput.parentElement.insertBefore(validationMessage, secondNameInput);
        valid = false;
    } else if (!secondNameInput.value){
        valid = false;
    }

    if (ageInput.value && !ageRegexp.test(ageInput.value)) {
        var validationMessage = generateError('Некорректный возраст');
        ageInput.parentElement.insertBefore(validationMessage, ageInput);
        valid = false;
    } else if (!ageInput.value){
        valid = false;
    }

    if (emailInput.value && !emailRegexp.test(emailInput.value)) {
        var validationMessage = generateError('Некорректный email');
        emailInput.parentElement.insertBefore(validationMessage, emailInput);
        valid = false;
    } else  if (!emailInput.value){
        valid = false;
    }

    if (passwordInput.value && !passwordRegexp.test(passwordInput.value)) {
        var validationMessage = generateError('Некорректный пароль');
        passwordInput.parentElement.insertBefore(validationMessage, passwordInput);
        valid = false;
    } else  if (!passwordInput.value){
        valid = false;
    }

    if (!valid) {
        submitButton.disabled = true;
    } else {
        submitButton.disabled = false;
    }
}

firstForm.addEventListener('submit', function(event) {
    if (submitButton.disabled) {
        event.preventDefault ();
    }
});

firstForm.addEventListener('change', validate);

document.addEventListener("DOMContentLoaded", validate);