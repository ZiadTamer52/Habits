let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Add Habit
function addHabit() {
    let habitInput = document.getElementById("habitName");
    let habitName = habitInput.value.trim();

    if (habitName) {
        habits.push({ name: habitName, progress: 0 });
        updateLocalStorage();
        renderHabits();
        habitInput.value = ""; // Clears input
    }
}

// Mark Habit as Completed
function markComplete(index) {
    habits[index].progress++;
    updateLocalStorage();
    renderHabits();
}

// Delete Habit
function deleteHabit(index) {
    habits.splice(index, 1);
    updateLocalStorage();
    renderHabits();
}

// Update Local Storage
function updateLocalStorage() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

// Render Habits
function renderHabits() {
    let habitList = document.getElementById("habitList");
    habitList.innerHTML = "";
    habits.forEach((habit, index) => {
        habitList.innerHTML += `
            <div class="habit">
                <button onclick="deleteHabit(${index})">❌</button>
                <span>${habit.name} (Days: ${habit.progress})</span>
                <button onclick="markComplete(${index})">✔</button>
            </div>
        `;
    });
    renderChart();
}

// Render Progress Chart
function renderChart() {
    let ctx = document.getElementById("progressChart").getContext("2d");

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: habits.map(h => h.name),
            datasets: [{
                label: "Progress",
                data: habits.map(h => h.progress),
                backgroundColor: "#007acc",
                barThickness: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}

// Theme Toggle
const themeButton = document.getElementById("toggleTheme");
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
    themeButton.innerHTML = document.body.classList.contains("light-mode") ? "🌙" : "☀";
});

// Load Theme from Storage
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeButton.innerHTML = "🌙";
} else {
    themeButton.innerHTML = "☀"; // Default to dark mode
}

renderHabits();