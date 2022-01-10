export class Todo {

    static createFromJSon({task, id, complete, creationDate}) {
        const todo = new Todo(task);
        todo.id = id;
        todo.complete = complete;
        todo.creationDate = creationDate;

        return todo;
    }

    constructor(task) {
        this.task = task;
        this.id = new Date().getTime();
        this.complete = false;
        this.creationDate = new Date();
    }
}