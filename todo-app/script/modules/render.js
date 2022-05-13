import createElement from './createElement.js';
import control from './control.js';
import serviceStorage from './serviceStorage.js';

export let userName = '';

const { getStorage } = serviceStorage;

const {
  createForm,
  createTableWrapper,
  createRow,
  createOverlay } = createElement;

const { formControl, btnsControl, trBtnsControl } = control;

export const renderTasks = (list, data) => {
  data.map(task => {
    const { tr, btns } = createRow(task);
    list.append(tr);
    trBtnsControl(btns, list);
  });
}

export const renderRowNumbers = (list) => {
  let index = 1;

  while (index <= list.childNodes.length) {
    list.childNodes[index - 1].childNodes[0].innerText = index;
    index++;
  }
}

export const renderTodoApp = (app, title) => {
  const { overlay, myForm, btn } = createOverlay();

  app.append(overlay);

  btn.addEventListener('click', () => {
    myForm.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      userName = Object.fromEntries(formData).name;

      overlay.classList.remove('is-visible');

      app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column');
      const h3 = document.createElement('h3');
      h3.innerText = title;
      app.append(h3);

      const { form } = createForm();
      const { tableWrapper, list } = createTableWrapper();

      app.append(form, tableWrapper);

      formControl(form, list);
      btnsControl(form);
      renderTasks(list, getStorage(userName));
      renderRowNumbers(list);
    });
  })

}
