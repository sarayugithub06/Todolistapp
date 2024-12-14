document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    
    loadTasks();

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create complete button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("li").forEach(task => {
            tasks.push({
                text: task.childNodes[0].textContent,
                completed: task.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add("completed");
            }

            const completeBtn = document.createElement("button");
            completeBtn.textContent = "✔";
            completeBtn.addEventListener("click", () => {
                li.classList.toggle("completed");
                saveTasks();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.addEventListener("click", () => {
                taskList.removeChild(li);
                saveTasks();
            });

            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
});