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
    const mainArea = document.querySelector(".main-area");
    const activeProject = projectManager.getActiveProject();

    if (!activeProject) {
      return;
    }

    mainArea.innerHTML = `
    <header class="project-view-header">
      <h2 id="active-project-title">${activeProject.getTitle()}</h2>
      <button id="add-task-btn" class="primary-btn">+ Add Task</button>
    </header>
    <div id="task-list" class="tasks-container">
      ${activeProject
        .getTodos()
        .map(
          (todo) => `
        <div class="task-row ${todo.getPriority()}" data-id="${todo.getId()}">
          <input type="checkbox" ${todo.getIsComplete() ? "checked" : ""} class="task-checkbox">
          <span class="task-title">${todo.getTitle()}</span>
          <span class="task-date">${todo.getDueDate() ? format(todo.getDueDate(), "MMM do") : "No Date"}</span>
          <button class="delete-task">X</button>
        </div>
      `
        )
        .join("")}

        <div id="inline-form-container"></div>
    </div>
  `;
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

  const renderInlineTaskForm = () => {
    const container = document.querySelector("#inline-form-container");

    container.innerHTML = `
    <form id="add-task-form" class="inline-task-form">
      <input type="text" id="task-title-input" placeholder="Task title" required autocomplete="off">
      <textarea id="task-desc-input" placeholder="Task description" rows="2"></textarea>
      
      <div class="form-meta-row">
        <input type="date" id="task-date-input" title="Due Date">
        <select id="task-priority-input">
          <option value="low">low</option>
          <option value="normal" selected>normal</option>
          <option value="high">high</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="button" id="cancel-task-btn" class="cancel-btn">Cancel</button>
        <button type="submit" class="submit-btn">Add Task</button>
      </div>
    </form>
  `;

    document.querySelector("#task-title-input").focus();
  };

  const init = () => {
    projectManager.load();

    const inbox = projectManager.getInbox();

    if (inbox) {
      projectManager.setActiveProject(inbox.getId());

      const inboxBtn = document.querySelector("#inbox-btn");
      inboxBtn.setAttribute("data-id", inbox.getId());
    }

    renderSidebar();
    renderTasks();
  };

  return {
    init,
    renderSidebar,
    renderTasks,
    renderManageProjects,
    renderInlineTaskForm,
  };
})();

export { displayController };
