const addForm = document.querySelector('.add');
const listTask = document.querySelector('.tasks');
const listCompleted = document.querySelector('.complete');
const lists = [listTask, listCompleted];
const search = document.querySelector('.search input');

const generateTemplateTask = task => {

    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center text-light">
        <span>${task}</span>
        <div>
            <i class="fa fa-check px-2 text-success check"></i>
            <i class="far fa-trash-alt text-danger px-1 delete"></i>
        </div>
    </li>
    `;

    listTask.innerHTML += html;

};

const generateTemplateCompleted = completed => {

    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center text-muted">
        <strike>${completed}</strike>
        <div>
            <i class="fas fa-redo-alt px-2 text-white back"></i>
            <i class="far fa-trash-alt text-danger px-1 delete"></i>
        </div>
    </li>
    `;

    listCompleted.innerHTML += html;

};

// add tasks
addForm.addEventListener('submit', e => {

    e.preventDefault();
    const task = addForm.add;

    if (task.value.trim().length) {
        generateTemplateTask(task.value.trim());
        locally.setTask(task.value.trim());
        addForm.reset();
    }

});


// add and back to completed
lists.forEach(list => {

    list.addEventListener('click', e => {

        const task = e.target.parentElement.parentElement;

        if (e.target.classList.contains('check')) {
            generateTemplateCompleted(task.textContent.trim());
            locally.setCompleted(task.textContent.trim());
            locally.deleteTask(task.textContent.trim());
            task.remove();
        }
        if (e.target.classList.contains('back')) {
            generateTemplateTask(task.textContent.trim());
            locally.setTask(task.textContent.trim());
            locally.deleteCompleted(task.textContent.trim());
            task.remove();
        }

    });

});


// delete tasks
lists.forEach(list => {
    list.addEventListener('click', e => {

        const task = e.target.parentElement.parentElement;

        if (e.target.classList.contains('delete')) {
            locally.deleteTask(task.textContent.trim());
            locally.deleteCompleted(task.textContent.trim());
            task.remove();
        }

    });
});


// search
const filterTasks = (term) => {

    const all = [...Array.from(listTask.children), ...Array.from(listCompleted.children)];

    Array.from(all)
        .filter((task) => !task.textContent.toLowerCase().includes(term))
        .forEach((task) => task.classList.add('d-none'));

    Array.from(all)
        .filter((task) => task.textContent.toLowerCase().includes(term))
        .forEach((task) => task.classList.remove('d-none'));

};
search.addEventListener('keyup', () => {

    const term = search.value.toLowerCase().trim();
    filterTasks(term);

});

// set local storage
class LocalStorage {
    constructor() {
        this.tasks = localStorage.getItem('tasks');
        this.completed = localStorage.getItem('completed');
    }
    init() {
        this.tasks = this.tasks === null ? [] : JSON.parse(this.tasks);
        for (const task of this.tasks) {
            generateTemplateTask(task);
        }
        this.completed = this.completed === null ? [] : JSON.parse(this.completed);
        for (const complete of this.completed) {
            generateTemplateCompleted(complete);
        }
    }
    setTask(value = '') {
        if (value !== '') {
            this.tasks.push(value);
        }
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    setCompleted(value = '') {
        if (value !== '') {
            this.completed.push(value);
        }
        localStorage.setItem('completed', JSON.stringify(this.completed));
    }
    deleteTask(value) {
        this.tasks = this.tasks.filter(task => task !== value);
        this.setTask();
    }
    deleteCompleted(value) {
        this.completed = this.completed.filter(complete => complete !== value);
        this.setCompleted();
    }
}

const locally = new LocalStorage();
locally.init();