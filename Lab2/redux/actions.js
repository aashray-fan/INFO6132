// import { db } from '../firebaseConfig';
// import { collection, addDoc } from 'firebase/firestore';

import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from './actionTypes';

let nextTodoId = 0;

export const addTodo = ({ task, status }) => {
  const payload = {
    id: ++nextTodoId,
    task,
    status,
  };
  // const docRef = await addDoc(collection(db, 'todo_list'), payload);
  // console.log('Document written with ID: ', docRef.id);

  return {
    type: ADD_TODO,
    payload,
  };
};

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: {
    id,
  },
});

export const updateTodo = ({ id, task, status }) => ({
  type: UPDATE_TODO,
  payload: {
    id,
    task,
    status,
  },
});
