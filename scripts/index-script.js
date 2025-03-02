// @formatter:off

// UI Design [DONE]
// Clicking Complete Button [DONE]
// Decrease on Task Assigned [DONE]
// Increase on Total Tasks [DONE]
// Add into Activity List [DONE]
// Disable Complete Button [DONE]
// Clear Button Clears Task List [DONE]
// Navigate to New Page clicking on Discover Something [DONE]
// Add Nav Bar with Back Button [DONE]
// Answer Asked Questions [DONE]

// Challenge:
// 1. Activate Theme Switch [DONE]
// 2. Show Current Date [DONE]
// 3. Show Task Title on Activity [DONE]
// 4. Show Additional Alert on Completing All Tasks [DONE]

// @formatter:on

document.addEventListener("DOMContentLoaded", () => {
    addTaskCardClickListener();
    addDiscoverMoreClickListener();
    addThemeSwitchClickListener();
    updateCurrentDate();
    countAndSetTasksAssigned();
    observeRemainingTasks();
});

const addDiscoverMoreClickListener = () => {
    document.getElementById("discover-div").addEventListener("click", (e) => {
        location.href = "./blogs.html";
    });
};

const getInnerTextById = (elementId) =>
    document.getElementById(elementId).innerText;

const setInnerText = (elementId, text) => {
    document.getElementById(elementId).innerText = text;
};

function addTaskCardClickListener() {
    document
        .querySelector(".task-cards")
        .addEventListener("click", function (event) {
            let targetElement = event.target;
            if (targetElement.classList.contains("btn-complete")) {
                console.log("Complete Task!");

                /* show alert */
                alert("Board Updated Successfully!");

                /* change button appearance */
                targetElement.classList.remove("bg-blue-600");
                targetElement.classList.add("bg-gray-300");
                targetElement.classList.add("btn-disabled");

                /* update remaining task count */
                let taskRemainingCountText = getInnerTextById("task-remaining-count");
                let taskRemaining = parseInt(taskRemainingCountText);
                taskRemaining--;
                setInnerText("task-remaining-count", taskRemaining);

                /* update total task count */
                let totalTasksCountText = getInnerTextById("total-tasks-count");
                let totalTasks = parseInt(totalTasksCountText);
                totalTasks++;
                setInnerText("total-tasks-count", totalTasks);

                /* add into the activity list */
                let activityLog = document.getElementById("activity-log");
                // let newActivity = document.createElement("p");
                // newActivity.classList.add("bg-blue-100", "p-3", "rounded-md", "my-2", "text-center");
                let taskCardElement = event.target.closest(".task-card");
                let taskTitle = taskCardElement.querySelector(".task-title").innerText;

                const now = new Date();
                const time = now.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                });

                const newActivity = `<p class="bg-blue-100 p-3 rounded-md my-2 text-center">${taskTitle} at ${time}</p>`;
                activityLog.insertAdjacentHTML("afterbegin", newActivity);

                // newActivity.innerText = `${taskTitle} at ${time}`;
                // activityLog.appendChild(newActivity);
            } else {
                console.log("Ignore Click on Tasks");
            }
        });
}

function countAndSetTasksAssigned() {
    console.log("Counting Tasks");
    let taskCards = document.querySelectorAll(".task-card");
    let taskCount = taskCards.length;
    console.log("Task Count" + taskCount);
    setInnerText("task-remaining-count", taskCount);
}

document
    .getElementById("btn-clear-activities")
    .addEventListener("click", () => {
        console.log("Clearing Activities");
        let activityLog = document.getElementById("activity-log");
        activityLog.replaceChildren();
    });

function observeRemainingTasks() {
    const taskRemaining = document.getElementById("task-remaining-count"); // Element to observe
    const config = {childList: true, subtree: true, characterData: true}; // Configuration

    const callback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === "characterData" || mutation.type === "childList") {
                console.log("Content changed:", mutation);
                let currentTaskCount = mutation.target.innerText;
                console.log(`Remaining Tasks: ${currentTaskCount}`);
                // Your code to handle the change

                if (
                    mutation.oldValue !== currentTaskCount &&
                    currentTaskCount === "0"
                ) {
                    alert("Congratulations!!! All Tasks Completed!");
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(taskRemaining, config);

    // To stop observing:
    // observer.disconnect();
}


function getCurrentDateFormatted() {
    const now = new Date();
    const options = {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};
    return now.toLocaleDateString('en-US', options);
}

function updateCurrentDate() {
    document.getElementById("today-datetime").innerText = getCurrentDateFormatted();
}

function addThemeSwitchClickListener() {
    document.getElementById("theme-switch")
        .addEventListener("click", () => {

            console.log("Theme Switch");

            let classList = document.body.classList;
            const classesToRemove = [];

            for (const className of classList) {
                if (className.startsWith("bg-")) {
                    classesToRemove.push(className);
                }
            }

            for (const classToRemove of classesToRemove) {
                classList.remove(classToRemove);
            }

            classList.add(`bg-[${getRandomHexColor()}]`);
        });
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}