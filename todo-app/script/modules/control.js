import elem from './createElement.js';
import services from './serviceStorage.js';
import { userName } from '../script.js';
import * as render from './render.js';

const {getStorage, removeTask, addTaskData, doneTask} = services;

const trBtnsControl = (btns, list) => {
    btns[0].addEventListener('click', (event) => {
        const target = event.target;
        console.log(target.parentNode.parentNode.querySelector('.tid').textContent);
        if (confirm('Удалить задачу?')){
            removeTask(userName, target.parentNode.parentNode.querySelector('.tid').textContent);
            target.closest('tr').remove();
            render.renderRowNumbers(list);
        }
    });

    btns[1].addEventListener('click', (event) => {
        const target = event.target;
        const trClosest = target.closest('tr');
        const className = trClosest.className;
        if (className !== 'table-success'){
            trClosest.classList.value = '';
            trClosest.classList.add('table-success');
            trClosest.childNodes[1].classList.add('text-decoration-line-through');
            trClosest.childNodes[2].innerText = 'Выполнена';
            doneTask(userName, target.parentNode.parentNode.querySelector('.tid').textContent);
        }
    });
};

const addTaskPage = (task, list) => {
    const num = getStorage(userName).length + 1;
    const {tr, btns} = elem.createRow(task, num); 
    list.append(tr);
    trBtnsControl(btns, list);
    render.renderRowNumbers(list);
};

const btnsControl = (form) => {
    
    form.reset();
    
    const saveBtn = document.querySelector('.btn-primary');
    saveBtn.setAttribute('disabled', 'disabled');
      
    const resetBtn = document.querySelector('.btn-warning');
    resetBtn.addEventListener('click', () => {
      form.reset();
      saveBtn.setAttribute('disabled', 'disabled');
    });
}

const formControl = (userName, form, list) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newTask = Object.fromEntries(formData);
      newTask.status = 'В процессе';
      newTask.id = Math.random().toString().substring(2, 10);
      console.log('newTask: ', newTask);
      addTaskPage(newTask, list);
      addTaskData(userName, newTask);
      btnsControl(form);
     });
  };

export default {formControl, btnsControl, trBtnsControl};