import {Todo} from "../classes";
import {todoList} from "../index";

// References
const divTodoList = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const buttonClear = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const aFilters = document.querySelectorAll('.filter');
const strongCount = document.querySelector('.todo-count').firstChild;

console.log(strongCount);

export const createTodoHtml = (todo) => {
    const htmlTodo = `
        <li class="${todo.complete ? 'completed' : ''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.complete ? 'checked' : ''}>
                <label>${todo.task}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    const li = div.firstElementChild;

    divTodoList.append(li);
    return li;
}

export const updateTodoCount = (count) => {
    strongCount.innerHTML = count;
};


// Events
inputNewTodo.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && inputNewTodo.value.length > 0) {
        const newTodo = new Todo(inputNewTodo.value);

        todoList.addNewTodo(newTodo);
        createTodoHtml(newTodo);
        inputNewTodo.value = '';

        updateTodoCount(todoList.amountPending);
    }
});

divTodoList.addEventListener('click', (event) => {
    const elementName = event.target.localName; // input, label, button
    const todoElement = event.target.parentElement.parentElement;
    const todoId = parseInt(todoElement.getAttribute('data-id'));

    if (elementName.includes('input')) {
        todoList.checkmarkTodo(todoId);
        todoElement.classList.toggle('completed'); // Add or Remove class with toggle
    }

    if (elementName.includes('button')) {
        todoList.removeTodo(todoId);
        divTodoList.removeChild(todoElement);
    }
    updateTodoCount(todoList.amountPending);
});

buttonClear.addEventListener('click', () => {
    todoList.removeAllFinishedTodos();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const element = divTodoList.children[i];

        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element);
        }
    }
    updateTodoCount(todoList.amountPending);
});

ulFilters.addEventListener('click', (event) => {
    const filter = event.target.text;

    if (!filter) {
        return null;
    }

    /*for (const aFilter of aFilters) {
        aFilter.classList.remove('selected');
    }*/
    aFilters.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch (filter) {
            case 'Pendientes':
                if (completed) {
                    element.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completed) {
                    element.classList.add('hidden');
                }
                break;
        }
    }
});