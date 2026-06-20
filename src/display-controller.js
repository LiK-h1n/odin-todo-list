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

  return { init, renderSidebar, renderTasks };
})();

export { displayController };
