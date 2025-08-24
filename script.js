document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // --- Load tasks from Local Storage ---
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            createTaskElement(taskText, false);
        });
    }

    // --- Save tasks to Local Storage ---
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li span').forEach(span => {
            tasks.push(span.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // --- Helper: create task DOM element ---
    function createTaskElement(taskText, save = true) {
        // li wrapper
        const li = document.createElement('li');

        // span for text (important for saving later)
        const span = document.createElement('span');
        span.textContent = taskText;

        // remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(span);
        li.appendChild(removeButton);
        taskList.appendChild(li);

        if (save) saveTasks();
    }

    // --- Add a new task ---
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        createTaskElement(taskText, true);
        taskInput.value = "";
    }

    // Attach event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when page is ready
    loadTasks();
});
