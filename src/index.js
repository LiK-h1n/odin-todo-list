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
    toggleActiveProject();
    target.classList.add("active");
    displayController.renderTasks(); // I tried this but it doesn't seem to fix it
  } else if (target.id === "add-project-btn") {
    toggleActiveProject();
    displayController.renderSidebar();
    displayController.renderManageProjects();
  }
});

mainArea.addEventListener("submit", (event) => {
  let target = event.target;

  if (target.id === "manage-add-project-form") {
    const projectTitle = document.querySelector("#new-project-input").value;

    projectManager.addProject(projectTitle);
    displayController.renderSidebar();
    displayController.renderManageProjects();

    event.preventDefault();
  }
});

mainArea.addEventListener("click", (event) => {
  let target = event.target;

  if (target.classList.contains("task-checkbox")) {
    const todoId = target.closest(".task-row").dataset.id;
    projectManager.getActiveProject().getTodoById(todoId).toggleComplete();
    displayController.renderTasks();
  } else if (target.classList.contains("delete-task")) {
    const todoId = target.closest(".task-row").dataset.id;
    projectManager.getActiveProject().removeTodo(todoId);
    displayController.renderTasks();
  }
});

displayController.init();
