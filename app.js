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
        task.value = "";
    }

});


// add and back completed
lists.forEach(list => {

    list.addEventListener('click', e => {

        const completed = e.target.parentElement.parentElement;

        if (e.target.classList.contains('check')) {
            generateTemplateCompleted(completed.textContent.trim());
            completed.remove();
        }
        if (e.target.classList.contains('back')) {
            generateTemplateTask(completed.textContent.trim());
            completed.remove();
        }

    });

});


// delete task
lists.forEach(list => {
    list.addEventListener('click', e => {

        if (e.target.classList.contains('delete')) {
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