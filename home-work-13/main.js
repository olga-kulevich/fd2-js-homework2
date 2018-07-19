(function () {
    const loadDataButtonElement = document.getElementById('loadData'),
          dataContainerElement = document.getElementById('dataContainer');

    loadDataButtonElement.addEventListener('click', () => {
        dataContainerElement.innerHTML = "";
        loadData('users.json', function (users) {
            for (let i = 0; i < users.length; i++) {
                const dataBlockElement = createUserDataBlockElement(users[i]);
                dataContainerElement.appendChild(dataBlockElement);
            };
        });
    });

    function loadData(url, callback) {
        const request = new XMLHttpRequest();

        request.open('get', url);
        request.addEventListener('load', () => {
            const result = JSON.parse(request.response);

            callback(result);
        });

        request.send();
    }

    function createUserDataBlockElement(user) {
        const result = document.createElement('div'),
              nameElement = document.createElement('span'),
              ageElement = document.createElement('span');

        nameElement.textContent = user.name;
        ageElement.textContent = user.age;

        result.appendChild(nameElement);
        result.appendChild(ageElement);

        return result;
    }

})();
