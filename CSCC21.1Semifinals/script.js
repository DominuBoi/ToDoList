let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();

    if (taskName) {
        const newTask = {
            id: Date.now(),
            name: taskName,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = "";
        displayTasks();
    }
}

function displayTasks(filter = 'all') {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'incomplete') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.className = task.completed ? 'completed' : '';

        taskItem.innerHTML = `
            <span>${task.name}</span>
            <div class="task-buttons">
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="complete" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

function filterTasks(type) {
    displayTasks(type);
}

function editTask(id) {
    const newTaskName = prompt("Edit the task:");
    if (newTaskName) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.name = newTaskName.trim();
            displayTasks();
        }
    }
}

function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        displayTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}
