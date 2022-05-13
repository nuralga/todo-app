const createButtonsGroup = params => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;
    return button;
  });
  btnWrapper.append(...btns);
  return {
    btnWrapper,
    btns,
  };
};

const createForm = () => {

  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');

  // const span = document.createElement('span');
  // span.classList.add('resizeable-input');
  
  const label = document.createElement('label');
  label.classList.add('form-group', 'me-2', 'd-flex');
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'title';
  input.classList.add('form-control', 'me-2');
  input.setAttribute('placeholder', "ввести задачу");
  
  input.addEventListener('keyup', (event) => {
    const saveBtn = document.querySelector('.btn-primary');
    if (event.target.value !== ''){
      saveBtn.removeAttribute('disabled');
    } else {
      saveBtn.setAttribute('disabled', 'disabled');
    }
  });
  

  const select = document.createElement('select');
  select.name = 'importance';
  select.classList.add('form-control', 'me-2');
  select.appendChild(new Option('обычная', 'обычная'));
  select.appendChild(new Option('важная', 'важная'));
  select.appendChild(new Option('срочная', 'срочная'));

  
  label.append(input, select);
  form.append(label);
  // form.append(select);

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
    },
    {
      className: 'btn btn-warning',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  form.append(...buttonGroup.btns);

  return {
    form,
  };
};

const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');
  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
        <th>№</th>
        <th>Задача</th>
        <th>Статус</th>
        <th>Действия</th>
    </tr>
    `);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;
  return table;
};

const checkImportance = (status) => {
  switch (status) {
    case 'обычная':
      return 'table-light';
      case 'важная':
        return 'table-warning';
        case 'срочная':
          return 'table-danger';
    default:
      return
  }
}

const createRow = (task) => {
  
  const tr = document.createElement('tr');

  let trClass = checkImportance(task.importance);
 

  if (task.status === 'Выполнена'){
    trClass = 'table-success';
  }
  tr.setAttribute('data-importance', task.importance);
  tr.classList.add(trClass);

  const tdNum = document.createElement('td');

  const tdTask = document.createElement('td');
   const statusClass = task.status === 'В процессе' ? 'task' : 'text-decoration-line-through';
   tdTask.classList.add(statusClass);
  tdTask.textContent = task.title;

  const idSpan = document.createElement('span');
  idSpan.textContent = task.id;
  idSpan.classList.add('tid', 'd-none');
  tdTask.append(idSpan);

  const tdStatus = document.createElement('td');
  tdStatus.textContent = task.status;
  
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-danger me-1',
      type: 'submit',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success me-1',
      type: 'submit',
      text: 'Завершить',
    },
    {
      className: 'btn btn-light',
      type: 'submit',
      text: 'Редактировать',
    },
  ]);

  const tdButs = document.createElement('td');
  tdButs.append(...buttonGroup.btns);

  tr.append(tdNum, tdTask, tdStatus, tdButs);
  return {
    tr,
    btns: buttonGroup.btns
  };
};

const createTableWrapper = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');
  const table = createTable();
  tableWrapper.append(table);
  return {tableWrapper, list: table.tbody};
};

const createOverlay = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay', 'is-visible');
  const myForm = document.createElement('form');
  myForm.classList.add('form');
  myForm.insertAdjacentHTML('beforeend', `
      <h2 class="form-title">Здравствуйте!</h2>
      <div class="form-group">
        <label class="form-label" for="name">Введите имя пользователя:</label>
        <input class="form-input form-control mb-2" name="name" id="name" type="text" required/>
      </div>`);
  
  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = 'Войти';
  btn.classList.add('btn', 'btn-success')

  

  myForm.append(btn);
  overlay.append(myForm);

  return {
    overlay,
    myForm,
    btn,
  };
};

export default { createForm, createTableWrapper, createRow, checkImportance, createOverlay};