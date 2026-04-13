// Array of task objects (Bonus I)
let tasks = [];
let taskIdCounter = 0;

// Get DOM elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const listTasks = document.querySelector('.listTasks');

// Function to add a new task
function addTask(event) {
    event.preventDefault(); // Prevent form submission
    
    const taskText = taskInput.value.trim();
    
    // Check that input is not empty
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create task object (Bonus I)
    const task = {
        task_id: taskIdCounter++,
        text: taskText,
        done: false
    };
    
    // Add to array
    tasks.push(task);
    
    // Add to DOM
    renderTask(task);
    
    // Clear input
    taskInput.value = '';
    taskInput.focus();
}

// Function to render a single task to the DOM
function renderTask(task) {
    // Create task container
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.setAttribute('data-task-id', task.task_id); // Bonus I: data-task-id attribute
    
    // Create delete button (X) with Font Awesome
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.onclick = () => deleteTask(task.task_id);
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.id = `task-${task.task_id}`;
    checkbox.checked = task.done;
    checkbox.onchange = () => doneTask(task.task_id);
    
    // Create label
    const label = document.createElement('label');
    label.className = 'task-label';
    label.htmlFor = `task-${task.task_id}`;
    label.textContent = task.text;
    
    // Assemble task item
    taskItem.appendChild(deleteBtn);
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    
    // Add to list
    listTasks.appendChild(taskItem);
    
    // Apply completed styling if task is already done
    if (task.done) {
        taskItem.classList.add('completed');
    }
}

// Bonus I: Function to mark task as done/undone
function doneTask(taskId) {
    // Find task in array
    const task = tasks.find(t => t.task_id === taskId);
    
    if (task) {
        // Toggle done property
        task.done = !task.done;
        
        // Update DOM
        const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
        const checkbox = taskItem.querySelector('.task-checkbox');
        
        if (task.done) {
            taskItem.classList.add('completed');
            checkbox.checked = true;
        } else {
            taskItem.classList.remove('completed');
            checkbox.checked = false;
        }
    }
}

// Bonus II: Function to delete a task
function deleteTask(taskId) {
    // Remove from array
    tasks = tasks.filter(t => t.task_id !== taskId);
    
    // Remove from DOM with animation
    const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
    taskItem.style.transform = 'translateX(100px)';
    taskItem.style.opacity = '0';
    
    setTimeout(() => {
        taskItem.remove();
        
        // Show empty message if no tasks left
        if (tasks.length === 0) {
            showEmptyMessage();
        }
    }, 300);
}

// Function to show empty message
function showEmptyMessage() {
    listTasks.innerHTML = '<p class="empty-message">No tasks yet. Add one above! ☝️</p>';
}

// Event listener for form submission
taskForm.addEventListener('submit', addTask);

// Initialize with empty message
showEmptyMessage();