const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Function to add a task
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const task = todoInput.value;

    // Send task to backend
    try {
        const response = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });

        const newTask = await response.json();
        addTaskToList(newTask);

        // Clear input field
        todoInput.value = '';
    } catch (error) {
        console.error('Error adding task:', error);
    }
});

// Function to display task on the frontend
function addTaskToList(task) {
    const li = document.createElement('li');
    li.innerHTML = `${task.task} <button class="delete-btn" data-id="${task.id}">Delete</button>`;
    todoList.appendChild(li);
}

// Function to delete task
todoList.addEventListener('click', async function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const id = event.target.getAttribute('data-id');
        
        // Send delete request to backend
        try {
            await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: 'DELETE'
            });
            
            event.target.parentElement.remove();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
});
