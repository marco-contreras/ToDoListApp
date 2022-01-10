import './css/styles.css';
import {Todo, TodoList} from "./classes";
import {createTodoHtml, updateTodoCount} from "./js/components";

export const todoList = new TodoList();

todoList.todos.forEach(createTodoHtml); // = todoList.todos.forEach((todo) => createTodoHtml(todo));
updateTodoCount(todoList.amountPending);