import TaskLocalStorage from "./modules/task-local-storage.js";
import TaskDOM from "./modules/task-DOM.js";

// UI Elements
const taskList  = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const taskApp   = document.querySelector('#task-app')
const form      = document.querySelector('#task-form');
const clearBtn  = document.querySelector('.clear-tasks');
const filter    = document.querySelector('#filter');

function loadEvents() {
    document.addEventListener('DOMContentLoaded',displayTasks); // Initial display
    form.addEventListener('submit',addTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup',filterTasks)
    taskApp.addEventListener('tasksupdated', displayTasks); // Whenever a task is updated
    taskApp.addEventListener('removedtask', removeTask); // Emitted by taskDOM when "delete" icon is clicked
}

loadEvents();

// Events
const tasksupdated = new Event('tasksupdated', {bubbles: true, cancelable: true});

// Modules
const taskLocalStorage = new TaskLocalStorage();
const tasksDOM = new TaskDOM(
    {
        taskList,
        taskInput,
        taskApp,
        form,
        clearBtn,
        filter
    }
);

// Display tasks retrieved from LS into DOM
function displayTasks()
{
    const tasks = taskLocalStorage.getTasks();
    tasksDOM.displayTasksDOM(tasks);
}

// Add Task
function addTask()
{
    const task = {
        value : taskInput.value,
        id : 0
    };

    const tasks = taskLocalStorage.getTasks();

    if(task.value === '')
    {
        alert('Coloque um título para sua tarefa');
        event.preventDefault();

    } else {

        task.id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;
        taskLocalStorage.setTask(task);
        displayTasks();
        event.preventDefault();
    }
}

function removeTask(event) {

    const id = parseInt(event.target.dataset.taskId);
    taskLocalStorage.removeTaskById(id);

    event.currentTarget.dispatchEvent(tasksupdated)
}

// Clear Tasks
function clearTasks(event) {
    if(taskList.firstChild !== null)
    {    
        if(confirm('Deseja remover todos os itens?'))
        {
            taskLocalStorage.clearTasks()
            .then(() => {
                event.target.dispatchEvent(tasksupdated);
            })
        }
    } else {
        confirm('Não há tarefas a serem removidas');
    }
}


// Filter Tasks
function filterTasks()
{
    const text = event.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task)
    {
        const item = task.textContent.toLocaleLowerCase();

        if(item.indexOf(text) !== -1)
        {
            task.style.display = 'block';
        }

        else
        {
            task.style.display = 'none';
        }
    });
}