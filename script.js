document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescInput = document.getElementById("taskDesc");
    
    const taskLists = document.querySelectorAll(".task-list");

    // --- TASK CREATION LOGIC ---
    addTaskBtn.addEventListener("click", () => {
        const title = taskTitleInput.value.trim();
        const desc = taskDescInput.value.trim();

        if (title === "") {
            alert("Please enter a task title!");
            return;
        }

        createTaskCard(title, desc);
        
        // Clear inputs
        taskTitleInput.value = "";
        taskDescInput.value = "";
        updateColumnCounts();
    });

    function createTaskCard(title, description) {
        // Build card container
        const card = document.createElement("div");
        card.classList.add("task-card");
        card.setAttribute("draggable", "true");
        card.setAttribute("id", "task-" + Date.now()); // Unique ID

        // Build structure elements
        const h3 = document.createElement("h3");
        h3.textContent = title;

        const p = document.createElement("p");
        p.textContent = description || "No description provided.";

        card.appendChild(h3);
        card.appendChild(p);

        // Attach event configurations for drag/drop interaction
        card.addEventListener("dragstart", () => {
            card.classList.add("dragging");
        });

        card.addEventListener("dragend", () => {
            card.classList.remove("dragging");
            updateColumnCounts();
        });

        // Add new item directly to 'To Do' column
        document.getElementById("todo-list").appendChild(card);
    }

    // --- DRAG AND DROP TARGET LOGIC ---
    taskLists.forEach(list => {
        list.addEventListener("dragover", (e) => {
            e.preventDefault(); // Required to allow dropping elements
            const draggingCard = document.querySelector(".dragging");
            if (draggingCard) {
                list.appendChild(draggingCard);
            }
        });
    });

    // --- HELPER METRIC REFRESH ---
    function updateColumnCounts() {
        document.getElementById("todo-count").textContent = document.getElementById("todo-list").children.length;
        document.getElementById("progress-count").textContent = document.getElementById("progress-list").children.length;
        document.getElementById("done-count").textContent = document.getElementById("done-list").children.length;
    }
});