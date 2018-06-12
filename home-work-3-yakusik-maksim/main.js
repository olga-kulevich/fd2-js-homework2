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
    if (path[0] in route) {
        if (typeof(route[path[0]]) === 'string') {
            return route[path[0]];
        } else {
            var subPath = path.slice(1),
                subRoute = route[path[0]];
            return getTemplateId(subRoute, subPath);
        }
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