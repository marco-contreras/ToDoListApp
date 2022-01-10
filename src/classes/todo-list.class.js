import {Todo} from "./todo.class";

export class TodoList {

    constructor() {
        this.chargeStorage();
    }

    addNewTodo(todo) {
        this.todos.push(todo);
        this.saveStorage();
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveStorage();
    }

    checkmarkTodo(id) {
        for (const todo of this.todos) {
            if (todo.id === id) {
                todo.complete = !todo.complete;
                break;
            }
        }
        this.saveStorage();
    }

    removeAllFinishedTodos() {
        this.todos = this.todos.filter(todo => !todo.complete);
        this.saveStorage();
    }

    saveStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    chargeStorage() {
        this.todos = localStorage.getItem('todo') ?
            JSON.parse(localStorage.getItem('todo'))
            : [];

        this.todos = this.todos.map(todoObj => Todo.createFromJSon(todoObj)); // Return an array modified
    }

    get amountPending() {
        return this.todos.filter(todo => !todo.complete).length;
    }
}