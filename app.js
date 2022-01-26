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

// set local storage
let tasks = localStorage.getItem('tasks');
tasks = tasks === null ? [] : JSON.parse(tasks);
for (const task of tasks) {
    generateTemplateTask(task);
}

let completed = localStorage.getItem('completed');
completed = completed === null ? [] : JSON.parse(completed);
for (const complete of completed) {
    generateTemplateCompleted(complete);
}

const StorageTask = value => {
    if (value !== undefined) {
        tasks.push(value);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
const StorageCompleted = value => {
    if (value !== undefined) {
        completed.push(value);
    }
    localStorage.setItem('completed', JSON.stringify(completed));
};

// add tasks
addForm.addEventListener('submit', e => {

    e.preventDefault();
    const task = addForm.add;

    if (task.value.trim().length) {
        generateTemplateTask(task.value.trim());
        StorageTask(task.value.trim());
        addForm.reset();
    }

});


// add and back to completed
lists.forEach(list => {

    list.addEventListener('click', e => {

        const task = e.target.parentElement.parentElement;

        if (e.target.classList.contains('check')) {
            generateTemplateCompleted(task.textContent.trim());
            StorageCompleted(task.textContent.trim());
            tasks = tasks.filter(item => item !== task.textContent.trim());
            StorageTask();
            task.remove();
        }
        if (e.target.classList.contains('back')) {
            generateTemplateTask(task.textContent.trim());
            StorageTask(task.textContent.trim());
            completed = completed.filter(item => item !== task.textContent.trim());
            StorageCompleted();
            task.remove();
        }

    });

});


// delete task
lists.forEach(list => {
    list.addEventListener('click', e => {

        const value = e.target.parentElement.parentElement.textContent.trim();

        if (e.target.classList.contains('delete')) {
            tasks = tasks.filter(item => item !== value);
            StorageTask();
            completed = completed.filter(item => item !== value);
            StorageCompleted();
            e.target.parentElement.parentElement.remove();
        }

    });
});


// search
const filterTasks = (term) => {

    Array.from(listTask.children)
        .filter((task) => !task.textContent.toLowerCase().includes(term))
        .forEach((task) => task.classList.add('d-none'));

    Array.from(listTask.children)
        .filter((task) => task.textContent.toLowerCase().includes(term))
        .forEach((task) => task.classList.remove('d-none'));

};

search.addEventListener('keyup', () => {

    const term = search.value.toLowerCase().trim();
    filterTasks(term);

});