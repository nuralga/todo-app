import * as render from './modules/render.js';

export let userName = '';

{
    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);

        userName = prompt("Введите имя пользователя!");
        console.log('userName: ', userName);

        render.renderTodoApp(app, title);
    }

    window.todoAppInit = init;
}