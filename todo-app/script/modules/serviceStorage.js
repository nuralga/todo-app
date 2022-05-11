import * as render from './render.js';

const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

const arrayRemove = (arr, value) => arr.filter((ele) => ele.id !== value);

const removeTask = (userName, id) => {
  let data = getStorage(userName);
  try {
    data = arrayRemove(data, id);
    localStorage.setItem(userName, JSON.stringify(data));
  } catch (error) {
    console.warn(error);
  }
};

const doneTask = (userName, id) => {
    
    let data = getStorage(userName);
    try {
      data.filter((ele) => {
        if(ele.id === id){
            ele.status = 'Выполнена';
        }
      });
      localStorage.setItem(userName, JSON.stringify(data));
      //render.renderTasks(list, getStorage(userName));
    } catch (error) {
      console.warn(error);
    }
  };

const addTaskData = (userName, tasks) => {
  setStorage(userName, tasks);
};

export default {
  getStorage,
  removeTask,
  addTaskData,
  doneTask,
};
