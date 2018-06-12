const routeConfig = {
          home: 'home',
          info: 'info',
          user: {
              list: 'user-list',
              edit: 'edit-user',
              create: 'create-user',
              ololo: {
                lolo: 'lolo42'
              }
          }
      },
      notFoundPageTemplateId = 'page-not-found',
      routedElement = $('main');

onHashChange();
$(window).on('hashchange', onHashChange);

function onHashChange() {
    const path = getHashPath(),
          templateId = getTemplateId(routeConfig, path) || notFoundPageTemplateId;

    setTemplate(routedElement, templateId);
}

function getTemplateId(route, path) {
    if (path[0] in route && typeof(route[path[0]]) === 'string') {
        console.log(route[path[0]]);
        return route[path[0]];
    } else if (path[1] in route[path[0]] && typeof(route[path[0]][path[1]]) === 'string') {
        console.log(route[path[0]][path[1]]);
        return route[path[0]][path[1]];
    } else if (path[2] in route[path[0]][path[1]] && typeof(route[path[0]][path[1]][path[2]]) === 'string') {
        console.log(route[path[0]][path[1]][path[2]]);
        return route[path[0]][path[1]][path[2]];
    } else {
        return undefined;
    }
}

function getHashPath() {
    return location.hash.slice(1).split('/');
}

function setTemplate(destinationElement, templateId) {
    const temlateElement = document.getElementById(templateId);

    var clone = document.importNode(temlateElement.content, true);

    destinationElement.empty();
    destinationElement.append(clone);
}