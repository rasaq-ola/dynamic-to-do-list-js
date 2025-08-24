// Save all tasks in Local Storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li span').forEach(span => {
        tasks.push(span.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a task to the list
function addTask(taskText = document.getElementById('task-input').value.trim(), save = true) {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Prevent empty tasks
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // Create li
    const li = document.createElement('li');

    // Create span for text (so save/remove works cleanly)
    const span = document.createElement('span');
    span.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // Remove on click
    removeBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    // Append elements
    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";

    // Save if new
    if (save) {
        saveTasks();
    }
}

// Load tasks from Local Storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || "[]");
    storedTasks.forEach(taskText => addTask(taskText, false));
}

// Main init
document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const li = document.createElement("li");
            li.textContent = taskText;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.className = "remove-btn";

            removeButton.onclick = function () {
                taskList.removeChild(li);
            };

            li.appendChild(removeButton);
            taskList.appendChild(li);

            taskInput.value = "";
        }
    }

    // Event listeners
    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
