"use strict";

// Events
const removedtask = new Event('removedtask', {bubbles: true, cancelable: true});

export default class TaskDOM {

    constructor({taskList, taskInput, taskApp, form, clearBtn, filter}){
        this.taskList  = taskList;
        this.taskInput = taskInput;
        this.taskApp   = taskApp;
        this.form      = form;
        this.clearBtn  = clearBtn;
        this.filter    = filter;
    }

    validateElements(){

        if((!this.taskList || !(this.taskList instanceof HTMLUListElement)))    throw new Error("taskList is not a <ul> element");
        if((!this.taskInput || !(this.taskInput instanceof HTMLInputElement)))  throw new Error("taskInput is not a <input> element");
        if((!this.form || !(this.form instanceof HTMLFormElement)))             throw new Error("form is not a <form> element");
        if((!this.filter|| !(this.filter instanceof HTMLInputElement)))         throw new Error("filter is not a <input> element");
    }

    displayTasksDOM(tasks){

        if (!(tasks instanceof Object)) {
            console.error("tasks is not an object");
        };

        try{
            this.validateElements();
        } catch(err){
            console.error(err);
        }

        this.taskList.innerHTML = '';
        this.taskInput.value = '';

        tasks.forEach( task => {

            // Task <li>
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(task.value));

            // Task delete
            const link = document.createElement('a');
            link.setAttribute('data-task-id', task.id);
            link.className = 'delete-item secondary-content';
            link.addEventListener('click', () => { event.currentTarget.dispatchEvent(removedtask) });
            link.innerHTML = '<i class="fa fa-remove"></i>';

            li.appendChild(link);

            this.taskList.appendChild(li);
        });
    }
}