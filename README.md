# JS Simple Task List

Simple task list project using:

* Native JavaScript modules:

```html
<script src="src/app.js" type="module"></script>
```
```js
import TaskLocalStorage from "./modules/task-local-storage.js";
import TaskDOM from "./modules/task-DOM.js";
```

* Custom Events:
```js
const tasksupdated = new Event('tasksupdated', {bubbles: true, cancelable: true});
const removedtask = new Event('removedtask', {bubbles: true, cancelable: true});
```

* Local Storage:
* ES5 Classes

I tried to modularize and make my code flexible as much as possible with communication with events to reduce components / code dependency. While doing so the code should be error prone. This project is for academic purposes.</br>

## Built With

* [Materialize CSS](https://materializecss.com/) - 1.0.0
* [JavaScript ES6](http://es6-features.org/#Constants) - ES6