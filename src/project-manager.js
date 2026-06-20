import { createProject } from "./project.js";
import { createTodo } from "./todo.js";

const projectManager = (function createProjectManager() {
  let _projects = [];
  let _activeProject = null;

  const addProject = (title, id) => {
    const project = createProject(title, id);
    _projects.push(project);

    return project;
  };

  const deleteProject = (projectId) => {
    _projects = _projects.filter((project) => project.getId() !== projectId);
  };

  const getAllProjects = () => _projects;

  const getProjectById = (projectId) =>
    _projects.find((project) => project.getId() === projectId);

  const setActiveProject = (projectId) => {
    _activeProject = getProjectById(projectId);
  };

  const getActiveProject = () => _activeProject;

  const getInbox = () =>
    _projects.find((project) => project.getTitle() === "Inbox");

  const save = () => {
    const dataString = JSON.stringify(
      getAllProjects().map((project) => project.toJSON())
    );

    localStorage.setItem("taskMasterData", dataString);

    console.log("Saved");
  };

  const load = () => {
    const rawData = localStorage.getItem("taskMasterData");

    if (!rawData) {
      return;
    }

    const parsedProjects = JSON.parse(rawData);

    _projects = [];

    parsedProjects.forEach((projectData) => {
      const project = addProject(projectData.title, projectData.id);

      projectData.todos.forEach((todoData) => {
        const todo = createTodo(todoData.title, todoData.id);

        todo.setDescription(todoData.description);
        todo.setDueDate(todoData.dueDate);
        todo.setPriority(todoData.priority);

        if (todoData.isComplete) {
          todo.toggleComplete();
        }

        project.addTodo(todo);
      });
    });
  };

  return {
    addProject,
    deleteProject,
    getAllProjects,
    getProjectById,
    setActiveProject,
    getActiveProject,
    getInbox,
    save,
    load,
  };
})();

projectManager.addProject("Inbox");
projectManager.setActiveProject(projectManager.getInbox().getId());

export { projectManager };
