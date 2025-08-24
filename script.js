document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    // Save all tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li span').forEach(span => {
            tasks.push(span.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to the list
    function addTask(taskText = taskInput.value.trim(), save = true) {
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = taskText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        removeButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(span);
        li.appendChild(removeButton);
        taskList.appendChild(li);

        taskInput.value = "";

        if (save) {
            saveTasks();
        }
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Event listeners
    addButton.addEventListener("click", () => addTask());

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Initialize on page load
    loadTasks();
});
