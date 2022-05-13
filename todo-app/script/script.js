import * as render from './modules/render.js';
{
    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        render.renderTodoApp(app, title);
    }

    window.todoAppInit = init;
}