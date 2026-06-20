import { projectManager } from "./project-manager.js";
import { format } from "date-fns";

const displayController = (() => {
  const projectListContainer = document.querySelector("#project-list");
  const taskListContainer = document.querySelector("#task-list");
  const activeProjectTitle = document.querySelector("#active-project-title");

  const renderSidebar = () => {
    const allProjects = projectManager.getAllProjects();

    const userProjects = allProjects.filter(
      (project) => project.getTitle() !== "Inbox"
    );

    projectListContainer.innerHTML = userProjects
      .map(
        (project) => `
    <li class="project-item" data-id="${project.getId()}">
      <button class="project-btn">${project.getTitle()}</button>
    </li>
  `
      )
      .join("");
  };

  const renderTasks = () => {
    const activeProject = projectManager.getActiveProject();

    if (!activeProject) {
      return;
    }

    activeProjectTitle.textContent = activeProject.getTitle();

    taskListContainer.innerHTML = activeProject
      .getTodos()
      .map(
        (todo) => `
      <div class="task-row ${todo.getPriority()}" data-id="${todo.getId()}">
        <input type="checkbox" ${todo.getIsComplete() ? "checked" : ""}>
        <span class="task-title">${todo.getTitle()}</span>
        <span class="task-date">${todo.getDueDate() ? format(todo.getDueDate(), "MMM do") : "No Date"}</span>
        <button class="delete-task">X</button>
      </div>
    `
      )
      .join("");
  };

  const renderManageProjects = () => {
    const mainArea = document.querySelector(".main-area");
    const allProjects = projectManager
      .getAllProjects()
      .filter((project) => project.getTitle() !== "Inbox");

    mainArea.innerHTML = `
    <div class="manage-projects-view">
      <header class="project-view-header">
        <h2>My Projects</h2>
      </header>

      <ul class="manage-project-list">
        ${allProjects
          .map(
            (project) => `
          <li class="manage-project-item">
            <span>${project.getTitle()}</span>
            <button class="delete-project-btn" data-id="${project.getId()}">Delete</button>
          </li>
        `
          )
          .join("")}
      </ul>
      
      <form id="manage-add-project-form" class="add-project-inline">
        <input 
          type="text" 
          id="new-project-input" 
          placeholder="Project name" 
          autocomplete="off" 
          required
        >
        <button type="submit" id="confirm-add-project">Add</button>
      </form>
    </div>
  `;
  };

  const init = () => {
    const inboxBtn = document.querySelector("#inbox-btn");
    const inboxId = projectManager
      .getAllProjects()
      .find((project) => project.getTitle() === "Inbox")
      .getId();

    inboxBtn.setAttribute("data-id", inboxId);

    renderSidebar();
    renderTasks();
  };

  return { init, renderSidebar, renderTasks, renderManageProjects };
})();

export { displayController };
