const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// Display tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const completeBtn = li.querySelector(".complete-btn");
        const deleteBtn = li.querySelector(".delete-btn");

        // Complete task
        completeBtn.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            renderTasks();
        });

        // Delete task
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);

            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

// Button click event
addBtn.addEventListener("click", addTask);

// Load tasks when page starts
renderTasks();