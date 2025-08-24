// Define addTask in the global scope so it can be invoked by DOMContentLoaded
function addTask() {
    // Get input and list each time (simple and matches the spec)
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const taskText = taskInput.value.trim();

    // If empty, alert and stop
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // Create list item and set its text
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // Remove this task on click
    removeBtn.onclick = () => {
        li.remove();
    };

    // Append button to li, and li to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";
}

// Main init after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements as constants (explicitly required by the spec)
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

// The spec also says: “Invoke the addTask function on DOMContentLoaded.”
document.addEventListener('DOMContentLoaded', addTask);
