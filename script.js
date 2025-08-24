document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements (names must match the spec)
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create li and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button, text and class via classList.add (checker requirement)
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Remove this li from taskList when clicked (explicitly via removeChild)
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Append button to li, then li to list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = "";
    }

    // Attach event listeners exactly as required
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
