import elem from './createElement.js';
import services from './serviceStorage.js';
import * as render from './render.js';
import { userName } from './render.js';

const { getStorage, removeTask, addTaskData, changeTaskStatus, editTask } = services;

const trBtnsControl = (btns, list) => {
    btns[0].addEventListener('click', (event) => {
        const target = event.target;
        if (confirm('Удалить задачу?')) {
            removeTask(userName, target.parentNode.parentNode.querySelector('.tid').textContent);
            target.closest('tr').remove();
            render.renderRowNumbers(list);
        }
    });

    btns[2].addEventListener('click', (event) => {
        const target = event.target;
        const trClosest = target.closest('tr');
        const tdClosest = target.closest('td');
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-secondary');
            btn.textContent = 'Сохранить';
            
            btn.addEventListener('click', (event) => {
            const target = event.target;
            trClosest.childNodes[1].setAttribute('contenteditable', 'false');
            const id = trClosest.childNodes[1].lastChild.textContent;
            editTask(id, trClosest.childNodes[1].firstChild.textContent);

            target.classList.add('d-none');
            target.parentNode.querySelector('.btn-light').classList.remove('d-none');
            });

            tdClosest.append(btn);
            trClosest.childNodes[1].setAttribute('contenteditable', 'true');
            
            target.classList.add('d-none');
    });

    btns[1].addEventListener('click', (event) => {
        const target = event.target;
        const trClosest = target.closest('tr');
        const className = trClosest.className;
        let status = '';
        const id = target.parentNode.parentNode.querySelector('.tid').textContent;
        if (className !== 'table-success') {
            trClosest.classList.value = '';
            trClosest.classList.add('table-success');
            trClosest.childNodes[1].classList.add('text-decoration-line-through');
            status = 'Выполнена';
            trClosest.childNodes[2].innerText = status;
            changeTaskStatus(userName, id, status);
        } else {
            trClosest.classList.value = '';
            trClosest.classList.add(elem.checkImportance(trClosest.getAttribute('data-importance')));

            trClosest.childNodes[1].classList.remove('text-decoration-line-through');
            trClosest.childNodes[1].classList.add('task');
            status = 'В процессе';
            trClosest.childNodes[2].innerText = status;
            changeTaskStatus(userName, id, status);
        }
    });
};

const addTaskPage = (task, list) => {
    const num = getStorage(userName).length + 1;
    const { tr, btns } = elem.createRow(task, num);
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
};

const formControl = (form, list) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = Object.fromEntries(formData);
        if (newTask.title.trim() !== ''){
            newTask.status = 'В процессе';
            newTask.id = Math.random().toString().substring(2, 10);
            addTaskPage(newTask, list);
            addTaskData(userName, newTask);
            // console.log('newTask: ', newTask);
        } else {            
            alert('Введите название задачи!')
        }
        btnsControl(form);
    });
};

export default { formControl, btnsControl, trBtnsControl };