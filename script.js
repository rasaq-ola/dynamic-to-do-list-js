// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Load tasks from Local Storage and display them
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

    /**
     * Save tasks array to Local Storage
     */
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li span').forEach(span => {
            tasks.push(span.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Add a new task to the list
     * @param {string} taskText - text for the new task
     * @param {boolean} save - whether to update Local Storage
     */
    function addTask(taskText = taskInput.value.trim(), save = true) {
        // Prevent adding empty tasks
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        // Create list item
        const li = document.createElement('li');

        // Create span for task text (so we can reliably save/remove later)
        const span = document.createElement('span');
        span.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Handle remove button click
        removeBtn.onclick = () => {
            li.remove();
            saveTasks();
        };

        // Append elements
        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Save to Local Storage if required
        if (save) {
            saveTasks();
        }
    }

    /**
     * Add task on button click
     */
    addButton.addEventListener('click', () => addTask());

    /**
     * Add task when pressing Enter
     */
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load existing tasks on page load
    loadTasks();
});
