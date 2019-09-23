const LOCAL_STORAGE_TASK = 'tasks';

export default class TaskLocalStorage {

    static get LOCAL_STORAGE_TASK() { return LOCAL_STORAGE_TASK}

    setTask(task) {
        const tasks = this.getTasks();
        tasks.push(task);

        this.setTasksArray(tasks)
    }

    setTasksArray(tasks) {
        localStorage.setItem(
            TaskLocalStorage.LOCAL_STORAGE_TASK,
            JSON.stringify(tasks));
    }

    getTasks() {
        return JSON.parse(localStorage.getItem(TaskLocalStorage.LOCAL_STORAGE_TASK)) || [];
    }

    removeTaskById(id) {
        const tasks = this.getTasks();
        const filteredTasks = tasks.filter(task => task.id !== id);

        this.setTasksArray(filteredTasks);
    }

    clearTasks() {
        // Just messing around simulating that this is a real BD
        return new Promise((resolve, reject) => {
            
            setTimeout(() => {

                localStorage.clear();
                resolve();
            }, 1000);
        });
    }
}
