// import { createTodo } from "./todo.js";
// import { projectManager } from "./project-manager.js";

// const gymProject = projectManager.addProject("gym");
// const squatsTask = createTodo("Squats");

// gymProject.addTodo(squatsTask);

// projectManager.getAllProjects().forEach((project) => {
//   console.log(`Project: ${project.getTitle()}`);

//   project.getTodos().forEach((todo) => {
//     console.log(` - Todo: ${todo.getTitle()}`);
//   });
// });

// ------------------------------------------------------

import { projectManager } from "./project-manager.js";
import { createTodo } from "./todo.js";
import { displayController } from "./display-controller.js";
import "./styles.css";

const inbox = projectManager.getInbox();
inbox.addTodo(createTodo("Finish the Odin Todo project"));
inbox.addTodo(createTodo("Call the gym for membership details"));

const gymProject = projectManager.addProject("Gym");
gymProject.addTodo(createTodo("Squats: 3 sets of 10"));
gymProject.addTodo(createTodo("Deadlifts: 1 rep max"));

const codingProject = projectManager.addProject("Study Plan");
codingProject.addTodo(createTodo("Master localStorage logic"));
codingProject.addTodo(createTodo("Learn date-fns formatting"));

const sampleTodo = codingProject.getTodos()[0];
sampleTodo.setDescription("Crucial for the 20-day sprint goal!");
sampleTodo.setPriority("high");

const sidebar = document.querySelector(".sidebar");
const mainArea = document.querySelector(".main-area");

function toggleActiveProject() {
  const activeProjectButton = sidebar.querySelector(".active");

  if (activeProjectButton) {
    activeProjectButton.classList.toggle("active");
  }
}

sidebar.addEventListener("click", (event) => {
  const target = event.target;

  if (target.id === "toggle-projects-btn") {
    const projectlistUl = document.querySelector("#project-list");

    projectlistUl.classList.toggle("hidden");

    const isNowHidden = projectlistUl.classList.contains("hidden");

    target.textContent = isNowHidden ? ">" : "v";
  } else if (
    target.id === "inbox-btn" ||
    target.classList.contains("project-btn")
  ) {
    const projectId =
      target.id === "inbox-btn"
        ? target.dataset.id
        : target.closest(".project-item").dataset.id;

    projectManager.setActiveProject(projectId);
    displayController.renderTasks();

    toggleActiveProject();

    target.classList.add("active");
  } else if (target.id === "add-project-btn") {
    displayController.renderSidebar();
    displayController.renderManageProjects();
  }
});

displayController.init();
