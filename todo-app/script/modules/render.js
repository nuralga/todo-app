import createElement from './createElement.js';
import control from './control.js';
import serviceStorage from './serviceStorage.js';
import { userName } from '../script.js';


const {getStorage} = serviceStorage;

const {
  createForm,
  createTableWrapper, 
  createRow} = createElement;

  const {formControl, btnsControl, trBtnsControl} = control;

export const renderTasks = (list, data) => {
  data.map( task => {
    const {tr, btns} = createRow(task);
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
  app.classList.add('vh-100', 'w-100', 'd-flex','align-items-center', 'justify-content-center', 'flex-column');
  const h3 = document.createElement('h3');
  h3.innerText = title;
  app.append(h3);

  const {form} = createForm();
  const {tableWrapper, list} = createTableWrapper();

  app.append(form, tableWrapper);


  formControl(userName, form, list);
  btnsControl(form);
  renderTasks(list, getStorage(userName));
  renderRowNumbers(list);
  
}
